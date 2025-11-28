import { Component, HostBinding, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostModalService } from '../../core/services/createPost-modal-service';
import { Subscription } from 'rxjs';
import { InputComponent } from '../input-component/input-component';
import { ProfileCard } from '../profile-card/profile-card';
import { UserService } from '../../core/services/userService';
import { User } from '../interfaces/user.interface';
import { Button } from '../button/button';
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, ProfileCard, InputComponent, Button, ClickOutsideDirective],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss',
})
export class CreatePost implements OnDestroy {
  createPostModalService = inject(CreatePostModalService);
  userService = inject(UserService);
  isActive: boolean = false;
  me: User | undefined = undefined;

  private subscrption = new Subscription();
  private modalSubscription!: Subscription;
  ngOnInit() {
    this.modalSubscription = this.createPostModalService.modalActiveState$.subscribe((state) => {
      this.isActive = state;
    });

    this.subscrption.add(
      this.userService.currentUser$.subscribe((user) => {
        if (user) this.me = user;
      })
    );
  }

  @HostBinding('attr.active')
  get isModalActive(): boolean {
    return this.isActive;
  }

  public onOutsideClick(): void {
    this.createPostModalService.closeModal();
  }

  onClose(): void {
    this.createPostModalService.closeModal();
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
}
