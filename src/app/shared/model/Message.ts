import { User } from "./User";
import { Helper } from "../helper/helper";

export class Message {
  from: User | string;
  content: any;
  time?: string | null;
  // action?: any

  public static create(data: {from: User | string, content: string, time: string}): Message {
    const message = new Message();
    message.from = data.from;
    message.content = data.content;
    message.time = Helper.fromApiToTime(data.time);
    return message;
  }
}
