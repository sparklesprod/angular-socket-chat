import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebsocketService} from "./services/websocket.service";
// import {ChatService} from "./services/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public current: string;
  public model: {
    username: string
  } = {
    username: null
  };

  @ViewChild('form') form: NgForm;

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    console.log('ngOninit()');
    // this.wsService.connect().subscribe(() => {
    //   console.log('New user is connection');
    // });

    this.wsService.online().subscribe((data) => {
      console.log(data);
    })
  }
}
