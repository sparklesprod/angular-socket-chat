import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebsocketService} from "./services/websocket.service";
import {OnlineEvent} from "./classes/online-event";
import {Event} from "./shared/model/event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public online: number;
  public message: string;

  @ViewChild('form') form: NgForm;

  constructor(private wsService: WebsocketService)
  {
    this.initIoConnection();
  }

  ngOnInit() {
    this.wsService.online().subscribe((onlineUsers: OnlineEvent) => {
      this.online = onlineUsers.online;
      console.log('Подключенных юзеров: ', this.online);
    })
  }

  public sendMessage(msg) {
    this.message = msg;

    if (!this.message || this.message.length <= 0) {
      return;
    }

    console.log('Сообщение: ', this.message);
    this.wsService.send({
      from: 'Annonymus',
      content: this.message
    });
    this.message = null;
  }

  private initIoConnection(): void {
    this.wsService.initSocket();

    this.wsService.onEvent(Event.CONNECT).subscribe(() => {
      console.log('connected');
    });

    this.wsService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log('disconnect');
    })
  }
}
