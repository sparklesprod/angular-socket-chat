import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnlineEvent } from "../classes/online-event";
import { Message } from "../shared/model/Message";
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {
  private socket;

  constructor() {}

  public initSocket(): void {
    this.socket = io.connect();
  }

  public online(): Observable<OnlineEvent> {
    return new Observable<OnlineEvent>(observer => {
      this.socket.on('online', (onlineUsers: OnlineEvent) => observer.next(onlineUsers));
    })
  }

  public onEvent(event): Observable<any> {
    return new Observable<any> (observer => {
      this.socket.on(event, () => observer.next());
    })
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }
}
