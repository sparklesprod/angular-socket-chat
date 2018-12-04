import {Events} from "../interface/events";

export class OnlineEvent implements Events {
  type: string;
  online: number;
}
