export interface ChatMessage {
  name: string|null;
  id: number|null;
  content: string;
  senderId: number;
  receiverId: number;
  time: string|null;
}

