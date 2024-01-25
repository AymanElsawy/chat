import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appCloseSidebar]',
  standalone: true
})
export class CloseSidebarDirective {

  private el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const sidebar = this.el.nativeElement;
    if (!sidebar.contains(event.target)) {
      if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        // sidebar.classList.add('d-none');
      }
    }
  }

}
