import { AuthService } from './../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatComponent } from '../chat/chat.component';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../model/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  darkMode: boolean = false;
  user = {} as User;
  private AuthService = inject(AuthService);// inject auth service
  private theme = inject(ThemeService); // inject the theme service

  ngOnInit() {
    this.AuthService.getPayLoad()?.subscribe((payload) => { // get user data
      this.user = payload;
    })
  }
  switchTheme() {
    this.darkMode = !this.darkMode; //change theme
    this.theme.current === 'light' ? this.theme.current = 'dark' : this.theme.current = 'light'; // switch theme
  }

  logout() {
    this.AuthService.logout(); // logout

  }
}
