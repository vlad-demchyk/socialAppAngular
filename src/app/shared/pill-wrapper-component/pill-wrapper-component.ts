import { Component } from '@angular/core';

@Component({
  selector: 'pill-wrapper',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './pill-wrapper-component.scss',
})
export class PillWrapperComponent {
  // @Input() text: string = '';
}
