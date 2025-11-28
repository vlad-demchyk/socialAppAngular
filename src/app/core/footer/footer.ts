import { Component, ViewChild, AfterViewInit, inject } from '@angular/core'; // Додайте AfterViewInit
import { Button } from '../../shared/button/button';
import { LaunchComponent } from '../../shared/launch-component/launch-component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [Button, LaunchComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
