import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdoptService } from 'src/app/service/adopt.service';
import { ChatMessage } from '../../interfaces/ChatMessage';

@Component({
  selector: 'app-admin-message-page',
  templateUrl: './admin-message-page.component.html',
  styleUrls: ['./admin-message-page.component.css']
})
export class AdminMessagePageComponent {
  constructor(private service: AdoptService, private router: Router) { }
  userId = Number(localStorage.getItem('userId'));
  messageList: ChatMessage[] = []

  ngOnInit() {
    this.service.showMessages(this.userId).subscribe(response => {
      console.log(response);
      this.messageList = response.response
    })
  }

  messageClicked(id: number) {
    this.router.navigate(['/admin/chatroom'], { queryParams: { otherId: id } });
  }
}
