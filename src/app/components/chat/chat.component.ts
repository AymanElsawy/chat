import { ChatService } from './../../services/chat.service';
import { Component, ElementRef, Inject, Input, ViewChild, inject } from '@angular/core';
import { User } from '../../model/user.interface';
import { FormsModule } from '@angular/forms';
import { Message } from '../../model/conversation.interface';
import { AuthService } from '../../services/auth.service';
import { io } from "socket.io-client";


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  @Input('userToChat') userToChat!: User;
  @ViewChild('chatBody') chatBody!: ElementRef;
  message: string = '';

  socket: any;
  chatbody: any;
  messages: Message[] = [];
  currentUser!: User;


  private ChatService = inject(ChatService); // inject chat service
  private AuthService = inject(AuthService); // inject auth service

  constructor() {
    this.socket = io('http://localhost:3000');

  }

  ngOnInit() {
    this.AuthService.getPayLoad()?.subscribe((payload) => { // get user data
      this.currentUser = payload;
    })
    this.socket.on('chat', (data: any) => {
      this.getMessages();
    })

  }

  ngOnChanges() {
    this.getMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom(); // scroll to bottom
  }
  scrollToBottom(): void {
    if (this.chatBody && this.chatBody.nativeElement) { // if chat body exists
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight; // scroll to bottom
    }
  }
  getMessages() {
    this.userToChat._id ? this.ChatService.getConversation(this.userToChat._id).subscribe({ // get conversation
      next: (data) => {
        this.messages = data?.messages; // set messages
      },
      error: (err) => {
        console.log(err);
      }
    }) : null
  }

  sendMessage() {
    this.ChatService.sendMessage(this.message, this.userToChat._id).subscribe({ // send message
      next: (data) => {
        this.message = ''; // clear message

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.socket.emit('chat', true); // emit socket
      }
    })
  }
}
