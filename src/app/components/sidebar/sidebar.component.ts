import { AuthService } from './../../services/auth.service';
import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../model/user.interface';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SearchPipe,FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  currentUser: User = {} as User;
  users!: User[];
  userSearch:string = '';
  @Output('user') user = new EventEmitter<User>();

  private theme = inject(ThemeService); // inject the theme service
  private AuthService = inject(AuthService); // inject the auth service


  ngOnInit() {
    this.AuthService.getPayLoad()?.subscribe((payload) => { // get user data
      this.currentUser = payload;
    })
    this.AuthService.getAllUsers().subscribe((users) => {
      this.users = users.filter((user) => user._id !== this.currentUser._id); // get all users except the current user
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
