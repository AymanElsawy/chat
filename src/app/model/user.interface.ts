export interface User {
  _id: string;
  username: string;
  conversations: Conversation[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Conversation {
  receiverId: string;
  messageId: MessageId;
  _id: string;
}

interface MessageId {
  _id: string;
  __v: number;
  members: Member[];
  messages: Message[];
}

interface Message {
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
