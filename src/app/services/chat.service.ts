import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Conversation } from '../model/conversation.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  sendMessage(message: string, id: string) {
    return this.http.post(`${environment.api}/chat/${id}`, { message });
  }

  getConversation(receiver: string):Observable<Conversation> {
    return this.http.get<Conversation>(`${environment.api}/messages/${receiver}`);

  }
}
