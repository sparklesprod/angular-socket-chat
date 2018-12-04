import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';

@Injectable()
export class WebsocketService {
  private socket;

  private socket$ = Rx.Observable.of(io());
  private connect$: Observable<any>;

  constructor() {
  }

  connect() {
    return this.connect$ = this.socket$.switchMap(socket => {
      return Rx.Observable.fromEvent(socket, 'connect').map(() => socket);
    })
    // this.socket = io.connect();
  }

  // addUser(user: any) {
  //   this.socket.emit('add-user', user);
  //   console.log("Отправил юзера");
  // }

}
