import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnlineEvent } from "../classes/online-event";
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {
  private socket;

  // private socket$ = Rx.Observable.of(io());
  // private connect$: Observable<any>;
  // private online$: Observable<any>;

  constructor() {
  }

  connect() {
    this.socket = io.connect();
  }

  online(): Observable<OnlineEvent> {
    return new Observable<OnlineEvent>(observer => {
      this.socket.on('online', (onlineUsers: OnlineEvent) => observer.next(onlineUsers));
    })
  }

  // addUser(user: any) {
  //   this.socket.emit('add-user', user);
  //   console.log("Отправил юзера");
  // }

}
