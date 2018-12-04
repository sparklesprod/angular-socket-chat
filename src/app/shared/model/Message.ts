import { User } from "./User";

export interface Message {
  from?: User | string;
  content?: any;
  // action?: any
}
