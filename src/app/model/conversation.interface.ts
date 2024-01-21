export interface Conversation {
  _id: string;
  __v: number;
  members: Member[];
  messages: Message[];
}

export interface Message {
  text: string;
  receiver: string;
  isRead: boolean;
  createdAt: string;
  _id: string;
}

interface Member {
  sneder: string;
  receiver: string;
  _id: string;
}
