import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebsocketService} from "./services/websocket.service";
import {OnlineEvent} from "./classes/online-event";
import {Event} from "./shared/model/event";
import {Message} from "./shared/model/Message";
import {User} from "./shared/model/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {
  public user: User;
  public online: number;
  public messages: Message[] = [];
  public message: string;

  @ViewChild('form') form: NgForm;
  @ViewChildren('chatMsg', {read: ElementRef}) chatMessage: QueryList<ElementRef>;

  constructor(private wsService: WebsocketService)
  {
    this.initUserModel();
    this.initIoConnection();
  }

  ngOnInit() {
    this.wsService.online().subscribe((onlineUsers: OnlineEvent) => {
      this.online = onlineUsers.online;
      console.log('Подключенных юзеров: ', this.online);
    })
  }

  ngAfterViewInit(): void {
    this.chatMessage.changes.subscribe(() => {
      try {
        document.querySelector('.chat').scrollTop = document.querySelector('.chat').scrollHeight;
      } catch (err) {}
    })
  }

  public sendMessage(msg) {
    this.message = msg;

    if (!this.message || this.message.length <= 0) {
      return;
    }

    console.log('Сообщение: ', this.message);
    this.wsService.send({
      from: this.user,
      content: this.message
    });
    this.message = null;
  }

  private initUserModel(): void {
    const randomId = Math.floor(Math.random() * (1000000)) + 1;
    this.user = {
      id: randomId
    };

    console.log('Init User: ', this.user);
  }

  private initIoConnection(): void {
    this.wsService.initSocket();

    this.wsService.onMessage().subscribe((message: Message) => {
      this.messages.push(message);
    });

    this.wsService.onEvent(Event.CONNECT).subscribe(() => {
      console.log('connected');
    });

    this.wsService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log('disconnect');
    })
  }
}
