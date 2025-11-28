import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
@Component({
  selector: 'app-profile-card',
  imports: [CommonModule],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  router: Router = inject(Router);
  @Input() user: User | undefined = undefined;

  openProfile() {
    if (this.user) this.router.navigate([`profile/:${this.user.userId}`]);
  }
}
