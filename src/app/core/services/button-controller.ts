import { inject, Injectable } from '@angular/core';
import { DataType } from '../../shared/interfaces/dataType.interface';
import { CreatePostModalService } from './createPost-modal-service';
import { LaunchModalService } from './launch-modal-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ButtonController {
  createPostModalService = inject(CreatePostModalService);
  launchModalService = inject(LaunchModalService);
  router = inject(Router);

  handleFooterAction(type: DataType): void {
    switch (type) {
      case 'filter':
        this.onFilter();
        break;
      case 'go-home':
        this.onHome();
        break;

      case 'like':
        this.onLike();
        break;
      case 'reply':
        this.onReply();
        break;
      case 'share':
        this.onShare();
        break;
      case 'add':
        this.onAdd();
        break;
      case 'submit':
        this.onSubmit();
        break;
      case 'mention':
        this.onMention();
        break;
      case 'comments':
        this.onComments();
        break;
      case 'launch-new':
        this.onLaunchNew();
        break;
      case 'create-post':
        this.onCreatePost();
        break;
      case 'create-post-launch':
        this.onCreatePostLaunch();
        break;
      case 'create-event-launch':
        this.onCreateEventLaunch();
        break;
      case 'create-event':
        this.onCreateEvent();
        break;
      case 'profile':
        this.onProfile();
        break;
      case 'notifications':
        this.onNotifications();
        break;
      case 'burger-menu':
        this.onBurgerMenu();
        break;
      case 'company':
        this.onCompany();
        break;
      case 'chat':
        this.onChat();
        break;
      case 'next-event':
        this.onNextEvent();
        break;
      case 'search':
        this.onSearch();
        break;
      case 'close':
        break;
      case 'heart':
        this.onLikes();
        break;
      default:
        console.warn('Невідомий тип дії:', type);
        break;
    }
  }

  onFilter() {
    /* ... */
  }
  onLike() {
    /* ... */
  }
  onReply() {
    /* ... */
  }
  onShare() {
    /* ... */
  }
  onAdd() {
    console.log('2x');

    /* ... */
  }
  onSubmit() {
    /* ... */
  }
  onMention() {
    /* ... */
  }
  onComments() {
    /* ... */
  }
  onLaunchNew() {
    this.launchModalService.openModal();
  }
  onCreatePost() {
    this.createPostModalService.openModal();
  }
  onCreatePostLaunch() {
    this.createPostModalService.openModal();
    this.launchModalService.closeModal();
  }
  onCreateEventLaunch() {
    this.launchModalService.closeModal();
  }
  onCreateEvent() {
    /* ... */
  }

  onHome() {
    this.router.navigate(['']);
  }
  onLikes() {
    this.router.navigate(['likes']);
  }
  onProfile() {
    this.router.navigate(['profile/me']);
  }
  onNotifications() {
    /* ... */
  }
  onBurgerMenu() {
    /* ... */
  }
  onCompany() {
    this.router.navigate(['groups']);
  }
  onChat() {
    this.router.navigate(['messages']);
  }
  onNextEvent() {
    this.router.navigate(['whatsNext']);
  }
  onSearch() {
    this.router.navigate(['search']);
  }
}
