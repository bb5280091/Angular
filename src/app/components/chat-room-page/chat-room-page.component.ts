import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatMessage } from '../interfaces/ChatMessage';
import { AdoptService } from 'src/app/service/adopt.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrls: ['./chat-room-page.component.css']
})
export class ChatRoomPageComponent implements OnInit {
  stompClient!: Stomp.Client;
  messages: ChatMessage[] = [];
  message: string = '';
  myId = 3;
  otherId = 0;
  name = ''

  constructor(private service: AdoptService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.route.queryParams.subscribe(param => {
      console.log(+param['id']);
      this.otherId = +param['id'];
      //接收對方id去查詢聊天紀錄然後放上來
    });
    this.service.showChatroomMessages(this.myId, this.otherId).subscribe(response => {
      console.log(response);
      this.messages = response.response;
      this.name = response.response[0].name;
    })
  }

  initializeWebSocketConnection() {
    (window as any).global = window
    const serverUrl = 'http://localhost:8080/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    console.log('到這一步');
    console.log(this.stompClient);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/public', (message) => {//subsribe to the public topic
        if (message.body) {
          this.messages.push(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage() {
    let currentDateTime = this.datepipe.transform((new Date), 'yyyy/MM/dd h:mm');
    if (this.message) {
      console.log('you have entered something');
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

  setId() {
    this.myId = parseInt((document.getElementById("myId") as HTMLInputElement).value);
    console.log(this.myId);
  }
}
