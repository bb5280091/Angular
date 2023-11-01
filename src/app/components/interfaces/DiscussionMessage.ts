export interface DiscussionMessage {
  userId: number|null;
  animalId: number|null;
  content: string;
  name: string;
  serialNo: number;
  replyNo: number;
  timestamp: string|null;
}

