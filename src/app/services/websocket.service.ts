import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';

@Injectable()
export class WebsocketService {
  private socket;

  private socket$ = Rx.Observable.of(io());
  private connect$: Observable<any>;
  private online$: Observable<any>;

  constructor() {
  }

  connect() {
    return this.connect$ = this.socket$.switchMap(socket => {
      return Rx.Observable.fromEvent(socket, 'connect').map(() => socket);
    })
    // this.socket = io.connect();
  }

  online() {
    return this.online$ = this.socket$.switchMap(socket => {
      return Rx.Observable.fromEvent(socket, 'online').map(() => socket);
    })
  }

  // addUser(user: any) {
  //   this.socket.emit('add-user', user);
  //   console.log("Отправил юзера");
  // }

}
