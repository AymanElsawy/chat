import { Component, Input } from '@angular/core';
import { User } from '../../model/user.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  @Input('userToChat') userToChat!: User;
}
