import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeService } from './services/theme.service';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent,ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'chat';
  darkMode:boolean = false;
  private theme = inject(ThemeService); // inject the theme service
  switchTheme() {
    this.darkMode = !this.darkMode;
    this.theme.current === 'light' ? this.theme.current = 'dark' : this.theme.current = 'light'; // switch theme
  }
}
