import { 
  Directive, 
  ElementRef, 
  Output, 
  EventEmitter, 
  HostListener, 
  inject 
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]', 
  standalone: true 
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef); 

  @Output() 
  public appClickOutside = new EventEmitter<void>();


  @HostListener('document:click', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const isInside = this.elementRef.nativeElement.contains(targetElement);
    if (!isInside) {
      this.appClickOutside.emit();
    }
  }
}