import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "./services/chat.service";
import {NgForm} from "@angular/forms";
import {WebsocketService} from "./services/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public current: string;
  public model: {
    username: string
  } = {
    username: null
  };

  @ViewChild('form') form: NgForm;

  constructor(private chatService: ChatService,
              private wsService: WebsocketService) {}

  ngOnInit() {
    this.chatService.messages.subscribe(msg => {
      this.addMsgToDOM(msg['text']);
    });
  }

  sendMessage() {
    if (this.current !== undefined && this.current !== '') {
      this.chatService.sendMsg(this.current);
    }
    this.current = '';
  }

  addMsgToDOM(msg) {
    let list = document.querySelector("#messages");
    let li = document.createElement('li');
    li.className = 'item';
    li.innerText = msg;
    list.appendChild(li);
  }

  enter() {
    if (this.form.invalid) {
      return;
    }

    this.wsService.addUser(this.model);
  }
}
