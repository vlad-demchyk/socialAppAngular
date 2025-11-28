import { Component, Input } from '@angular/core';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() title: string = 'Eventus';
}
