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

  public online(): Observable<number> {
    return new Observable<number>(observer => {
      this.socket.on('online', (onlineUsers: OnlineEvent) => observer.next(onlineUsers.online));
    })
  }

  public onEvent(event): Observable<any> {
    return new Observable<any> (observer => {
      this.socket.on(event, () => observer.next());
    })
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: any) => {
        observer.next(Message.create(data));
      });
    })
  }

  public onTyping(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.socket.on('typing', (typing: boolean) => observer.next(typing));
    })
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public isUserTyping(typing: boolean): void {
    this.socket.emit('typing', typing);
  }
}
