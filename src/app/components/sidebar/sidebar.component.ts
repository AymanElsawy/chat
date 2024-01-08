import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private theme = inject(ThemeService); // inject the theme service

  switchTheme(): void {
    if (this.theme.current === 'light') {
      this.theme.current = 'dark';
    } else {
      this.theme.current = 'light';
    }
  }
}
