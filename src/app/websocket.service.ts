import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient!: Stomp.Client;

  constructor() { }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/websocket'; // 替換為你的後端URL
    const socket = new SockJS(serverUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
    });
  }

  sendMessage(message: string) {
    this.stompClient.send('/app/chat.send', {}, message);
  }

  register(username: string) {
    this.stompClient.send('/app/chat.register', {}, username);
  }
}
