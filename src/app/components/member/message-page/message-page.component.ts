import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdoptService } from 'src/app/service/adopt.service';
import { ChatMessage } from '../../interfaces/ChatMessage';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent {
  constructor(private service: AdoptService, private router: Router) { }
  userId = 3;
  messageList: ChatMessage[] = []

  ngOnInit() {
    this.service.showMessages(this.userId).subscribe(response => {
      console.log(response);
      this.messageList = response.response
    })
  }

  messageClicked(id: number) {
    console.log(id);
    this.router.navigate(['/member/chatroom'], { queryParams: { id: id } });
  }

}
