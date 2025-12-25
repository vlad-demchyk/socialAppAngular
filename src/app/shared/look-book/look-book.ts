import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Photo } from '../interfaces/look-book';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment-component/comment-component';
import { Button } from '../button/button';
import { ProfileCard } from '../profile-card/profile-card';
import { PhotosService } from '../../core/services/photoService';

@Component({
  selector: 'app-look-book',
  imports: [CommonModule, CommentComponent, Button, ProfileCard],
  templateUrl: './look-book.html',
  styleUrl: './look-book.scss',
})
export class LookBook implements OnInit, OnChanges {
  @Input() userId?: number | null = null;
  @Input() photos?: Photo[];

  photosService = inject(PhotosService);
  displayPhotos: Photo[] = [];
  lookbookGrid: boolean = false;
  isLoading: boolean = true;
  icons = {
    feed: '/assets/icons/feed.svg',
    gallery: '/assets/icons/gallery.svg',
  };

  ngOnInit() {
    this.loadPhotos();
    if (this.userId) {
      this.lookbookGrid = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] || changes['photos']) {
      this.loadPhotos();
      if (this.userId && changes['userId']) {
        this.lookbookGrid = true;
      }
    }
  }

  loadPhotos() {
    if (this.photos) {
      // Якщо photos передані ззовні, використовуємо їх
      this.displayPhotos = this.photos;
      this.isLoading = false;
    } else if (this.userId) {
      // Якщо є userId, завантажуємо фото користувача
      this.isLoading = true;
      this.photosService.getPhotosByUserId(this.userId).subscribe((photos: Photo[]) => {
        this.displayPhotos = photos;
        this.isLoading = false;
      });
    } else {
      // Завантажуємо всі фото
      this.isLoading = true;
      this.photosService.getPhotos().subscribe((photos: Photo[]) => {
        this.displayPhotos = photos;
        this.isLoading = false;
      });
    }
  }

  switchLookbookType() {
    this.lookbookGrid = !this.lookbookGrid;
  }

  commentsVisible: { [key: number]: boolean } = {};

  commentsToggle(photo: Photo) {
    this.commentsVisible[photo.id] = !this.commentsVisible[photo.id];
  }

  likePhoto(photo: Photo) {
    console.log(`Like photo ${photo.id}`);
  }

  sharePhoto(photo: Photo) {
    console.log(`Share photo ${photo.id}`);
  }
}
