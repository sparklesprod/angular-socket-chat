import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {WebsocketService} from "./websocket.service";

@Injectable()
export class ChatService {

  public messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>this.wsService.connect().map((response: any): any => {
      return response;
    });
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }
}
