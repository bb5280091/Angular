import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { AdoptService } from '../../service/adopt.service';
import { ChatMessage } from '../interfaces/ChatMessage';

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrls: ['./chat-room-page.component.css']
})
export class ChatRoomPageComponent implements OnInit {
  stompClient!: Stomp.Client;
  messages: ChatMessage[] = [];
  message: string = '';
  myId = Number(localStorage.getItem('userId'));
  otherId = 0;
  name = ''

  constructor(private service: AdoptService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      //接收對方id去查詢聊天紀錄然後放上來
      console.log(+param['otherId']);
      this.otherId = +param['otherId'];
      this.service.showUserInfo(this.otherId).subscribe(response => {
        this.name = response.user.name;
        this.initializeWebSocketConnection();
      })
    });
    this.service.showChatroomMessages(this.myId, this.otherId).subscribe(response => {
      if (response.response.length !== 0) {
        this.messages = response.response;
      }
    })
  }

  initializeWebSocketConnection() {
    (window as any).global = window
    const serverUrl = 'http://localhost:8080/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    console.log(this.stompClient);
    this.stompClient.connect({}, () => {
      if (this.myId > this.otherId) {
        this.stompClient.subscribe('/topic/chat/' + this.myId + '/' + this.otherId, (message) => {//subsribe to the public topic
          if (message.body) {
            this.messages.push(JSON.parse(message.body));
          }
        });
      } else {
        this.stompClient.subscribe('/topic/chat/' + this.otherId + '/' + this.myId, (message) => {
          if (message.body) {
            this.messages.push(JSON.parse(message.body));
          }
        });
      }

    });
  }

  sendMessage() {
    let currentDateTime = this.datepipe.transform((new Date), 'yyyy/MM/dd h:mm');
    if (this.message) {
      const chatMessage = {
        name: null,
        id: null,
        content: this.message,
        senderId: this.myId, // Set your username here
        receiverId: this.otherId,
        type: 'CHAT',
        time: currentDateTime
      };
      this.stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage));//tell message to the server
      this.message = '';
    }
  }

}
