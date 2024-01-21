import { ChatService } from './../../services/chat.service';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { User } from '../../model/user.interface';
import { FormsModule } from '@angular/forms';
import {  Message } from '../../model/conversation.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnChanges {

  @Input('userToChat') userToChat!: User;
  message: string = '';

  messages: Message[] = [];
  currentUser!: User;

  private ChatService = inject(ChatService); // inject chat service
  private AuthService = inject(AuthService); // inject auth service


  ngOnInit() {
    this.AuthService.getPayLoad()?.subscribe((payload) => { // get user data
      this.currentUser = payload;
    })
  }

  ngOnChanges() {
    this.userToChat._id ? this.ChatService.getConversation(this.userToChat._id).subscribe({
      next: (data) => {
        this.messages = data.messages;

      },
      error: (err) => {
        console.log(err);
      }
    }): null
  }

  sendMessage() {
    this.ChatService.sendMessage(this.message, this.userToChat._id).subscribe({
      next: (data) => {
        this.message = '';
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
