import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
@Component({
  selector: 'app-input-component',
  imports: [Button],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
})
export class InputComponent {
  @Input() placeholder: string = '';

  submit(): void {
    console.log('submit');
    /*треба зрозуміти як передати йому куди саме після підпису відправляти дані форми
     та які саме дані */
  }
}
