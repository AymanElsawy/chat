import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private style!: HTMLLinkElement; 
  public static default = 'light'; // default theme
  currentTheme: string = ''; // current theme
  constructor() {
    this.init(); // init
  }
  init() {
    if (typeof document !== 'undefined') { // check if document is defined
      this.style = document!.createElement('link'); // create link
      this.style.rel = 'stylesheet'; // set rel
      document!.head.appendChild(this.style); // append to head
      if (this.currentTheme) { // if current theme
        this.style.href = `/${this.current}.css`; // set css
      }
    }
  }

  public get current(): string {
    return this.currentTheme ? this.currentTheme : ThemeService.default; // return current theme or light theme
  }

  public set current(value: string) {
    this.currentTheme = value; // set current theme
    this.style.href = `/${value}.css`; // set css
  }



}
