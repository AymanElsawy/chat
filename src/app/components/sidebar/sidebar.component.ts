import { Component, Input, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input('name') name!: string; // name of the user

  private theme = inject(ThemeService); // inject the theme service

  switchTheme(): void {
    if (this.theme.current === 'light') { // if current theme is light
      this.theme.current = 'dark'; // change theme
    } else {
      this.theme.current = 'light'; // change theme
    }
  }
}
