import { AuthService } from './../../services/auth.service';
import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../model/user.interface';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input('name') name!: string; // name of the user
  users!: User[];
  @Output('user') user = new EventEmitter<User>();

  private theme = inject(ThemeService); // inject the theme service
  private AuthService = inject(AuthService); // inject the auth service


  ngOnInit() {
    this.AuthService.getAllUsers().subscribe((users) => {
      this.users = users;
    })
  }

  switchTheme(): void {
    if (this.theme.current === 'light') { // if current theme is light
      this.theme.current = 'dark'; // change theme
    } else {
      this.theme.current = 'light'; // change theme
    }
  }

  chatWithUser(user: User) {
    this.user.emit(user);
  }
}
