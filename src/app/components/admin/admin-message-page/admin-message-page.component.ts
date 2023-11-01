import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatMessage } from '../../interfaces/ChatMessage';
import { AdoptService } from '../../../service/adopt.service';

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
