import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import ConnectOpts = SocketIOClient.ConnectOpts;

@Injectable()
export class WebsocketService {

  private readonly connectionOptions: ConnectOpts = {
    forceNew: true,
    timeout: 10000,
    transports: ["websocket"]
  };
  private socket;

  constructor() {
  }

  // connect(): Rx.Subject<MessageEvent> {
  //   this.socket = io.connect(environment.url, this.connectionOptions);
  //
  //   const observable = new Observable(_observer => {
  //     this.socket.on('message', (data) => {
  //       // console.log("Получение сообщений", data);
  //       _observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //
  //   const observer = {
  //     next: (data: Object) => {
  //       this.socket.emit('message', data);
  //     }
  //   };
  //
  //   return Rx.Subject.create(observer, observable);
  // }

  // addUser(user: any) {
  //   this.socket.emit('add-user', user);
  //   console.log("Отправил юзера");
  // }

}
