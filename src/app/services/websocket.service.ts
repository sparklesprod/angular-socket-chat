import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';

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

  online(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('online', (data: any) => observer.next(data));
    })
  }

  // addUser(user: any) {
  //   this.socket.emit('add-user', user);
  //   console.log("Отправил юзера");
  // }

}
