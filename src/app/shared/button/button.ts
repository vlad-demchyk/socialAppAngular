import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DataType, IconMap } from '../interfaces/dataType.interface';
import { ButtonController } from '../../core/services/button-controller';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  icons: IconMap = {
    filter: '/assets/icons/filter.svg',
    like: '/assets/icons/like.svg',
    reply: '/assets/icons/reply.svg',
    share: '/assets/icons/share.svg',
    add: '/assets/icons/add-circle.svg',
    mention: '/assets/icons/mention.svg',
    comments: '/assets/icons/comments.svg',
    profile: '/assets/icons/profile.svg',
    notifications: '/assets/icons/notifications.svg',
    company: '/assets/icons/events.svg',
    chat: '/assets/icons/chat.svg',
    search: '/assets/icons/search.svg',
    close: '/assets/icons/close-circle.svg',
    heart: '/assets/icons/heart.svg',
    'go-home': '/assets/icons/home.svg',
    'launch-new': '/assets/icons/plus.svg',
    'burger-menu': '/assets/icons/burger.svg',
    'next-event': '/assets/icons/calendar.svg',
  };
  @Input() text: string = '';
  @Input() dataType: DataType = 'add';
  buttonController = inject(ButtonController);

  public get iconUrl(): string | undefined {
    if (this.dataType && this.dataType in this.icons) {
      return this.icons[this.dataType as keyof typeof this.icons];
    }
    return undefined;
  }

  onClick(): void {
    this.buttonController.handleFooterAction(this.dataType);
  }
}
