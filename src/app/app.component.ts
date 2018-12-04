import {Component, OnInit, ViewChild} from '@angular/core';
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
