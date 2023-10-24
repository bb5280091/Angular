import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatMessage } from '../interfaces/ChatMessage';

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrls: ['./chat-room-page.component.css']
})
export class ChatRoomPageComponent implements OnInit {

  private stompClient!: Stomp.Client;
  public messages: ChatMessage[] = [];
  public message: string = '';

  ngOnInit(): void {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    (window as any).global = window
    const serverUrl = 'http://localhost:8080/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/public', (message) => {//subsribe to the public topic
        if (message.body) {
          this.messages.push(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage() {
    if (this.message) {
      console.log('you have entered something');
      const chatMessage = {
        content: this.message,
        sender: 'YourUsername', // Set your username here
        type: 'CHAT'
      };
      this.stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage));//tell message to the server
      this.message = '';
    }
  }
}
