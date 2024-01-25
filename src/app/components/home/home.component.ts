import { AuthService } from './../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatComponent } from '../chat/chat.component';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../model/user.interface';
import { CloseSidebarDirective } from '../../directive/close-sidebar.directive';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ChatComponent,CloseSidebarDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  darkMode: boolean = false;
  userToChat = {} as User;
  private AuthService = inject(AuthService);// inject auth service
  private theme = inject(ThemeService); // inject the theme service

  ngOnInit() {

  }
  switchTheme() {
    this.darkMode = !this.darkMode; //change theme
    this.theme.current === 'light' ? this.theme.current = 'dark' : this.theme.current = 'light'; // switch theme
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('d-none');
      sidebar.classList.toggle('active');
    }
  }

  logout() {
    this.AuthService.logout(); // logout
  }
  chatWithUser(user: User) {
    if (user) {
      this.userToChat = user;
    }
  }
}
