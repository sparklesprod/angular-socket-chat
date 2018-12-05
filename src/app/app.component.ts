import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebsocketService} from "./services/websocket.service";
import {Message} from "./shared/model/Message";
import {User} from "./shared/model/User";
import {Observable} from "rxjs/Observable";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('slide', [
      state('me', style({
        transform: 'translateX(0)', opacity: 1
      })),
      state('you', style({
        transform: 'translateX(0)', opacity: 1
      })),
      transition('* => me', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('.3s ease-in')
      ]),
      transition('* => you', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('.3s ease-in')
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  public user: User;
  public online: Observable<number>;
  public messages: Message[] = [];
  public message: string;

  private _connection;

  @ViewChild('form') form: NgForm;
  @ViewChildren('chatMsg', {read: ElementRef}) chatMessage: QueryList<ElementRef>;

  constructor(public wsService: WebsocketService)
  {
    this.initUserModel();
    this.initIoConnection();

    this.online = this.wsService.online();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._connection.unsubscribe();
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
  }

  private initIoConnection(): void {
    this.wsService.initSocket();

    this._connection = this.wsService.onMessage().subscribe((message: Message) => {
      this.messages.push(message);
    });

    // this.wsService.onEvent(Event.CONNECT).subscribe(() => {
    //   console.log('connected');
    // });

    // this.wsService.onEvent(Event.DISCONNECT).subscribe(() => {
    //   console.log('disconnect');
    // });
  }
}
