import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CreatePost } from '../../shared/create-post/create-post';
import { CreatePostModalService } from '../services/createPost-modal-service';
// import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet, CreatePost, AsyncPipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  createModalService = inject(CreatePostModalService);

  isModalOpen$ = this.createModalService.modalState$;
  isActive: boolean = false;
}
