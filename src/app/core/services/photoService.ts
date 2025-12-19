import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreatePhotoRequest, Photo } from '../../shared/interfaces/look-book';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  http: HttpClient = inject(HttpClient);

  private photosUrl = 'assets/jsonExample/look-book.json';

  // Кеш для фото (для роботи з заглушками)
  private photosCache: Photo[] = [];

  /**
   * Отримати всі фото
   */
  getPhotos(): Observable<Photo[]> {
    if (this.photosCache.length > 0) {
      return of(this.photosCache);
    }
    return new Observable((observer) => {
      this.http.get<Photo[]>(this.photosUrl).subscribe({
        next: (photos) => {
          this.photosCache = photos;
          observer.next(photos);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  /**
   * Отримати фото за ID
   */
  getPhotoById(photoId: number): Observable<Photo | undefined> {
    return new Observable((observer) => {
      this.getPhotos().subscribe((photos) => {
        const photo = photos.find((p) => p.id === photoId);
        observer.next(photo);
        observer.complete();
      });
    });
  }

  /**
   * Отримати фото конкретного користувача
   */
  getPhotosByUserId(userId: number): Observable<Photo[]> {
    return new Observable((observer) => {
      this.getPhotos().subscribe((photos) => {
        const userPhotos = photos.filter((p) => p.userId === userId);
        observer.next(userPhotos);
        observer.complete();
      });
    });
  }

  /**
   * Створити новий фото
   */
  createPhoto(photoData: CreatePhotoRequest): Observable<Photo> {
    const newPhoto: Photo = {
      id: Date.now(),
      userId: photoData.userId,
      authorId: photoData.authorId,
      userName: '',
      profilePhoto: '',
      publicationDate: photoData.publicationDate,
      photoContentText: photoData.photoContentText,
      photoUrl:
        typeof photoData.photoUrl === 'string'
          ? photoData.photoUrl
          : URL.createObjectURL(photoData.photoUrl),
    };

    this.photosCache = [newPhoto, ...this.photosCache];

    return of(newPhoto);
  }

  /**
   * Оновити фото
   */
  updatePhoto(photoId: number, updates: Partial<Photo>): Observable<Photo> {
    return new Observable((observer) => {
      this.getPhotos().subscribe((photos) => {
        const index = photos.findIndex((p) => p.id === photoId);
        if (index !== -1) {
          const updatedPhoto = { ...photos[index], ...updates };
          photos[index] = updatedPhoto;
          this.photosCache = photos;
          observer.next(updatedPhoto);
        } else {
          observer.error(new Error('Photo not found'));
        }
        observer.complete();
      });
    });
  }

  /**
   * Видалити фото
   */
  deletePhoto(photoId: number): Observable<boolean> {
    return new Observable((observer) => {
      this.getPhotos().subscribe((photos) => {
        this.photosCache = photos.filter((p) => p.id !== photoId);
        observer.next(true);
        observer.complete();
      });
    });
  }

  /**
   * Лайкнути/зняти лайк з фото
   */
  toggleLike(photoId: number, userId: number): Observable<Photo> {
    return new Observable((observer) => {
      this.getPhotoById(photoId).subscribe((photo) => {
        if (photo) {
          const updatedPhoto = {
            ...photo,
            likes: photo.likes ? photo.likes + 1 : 1,
          };
          this.updatePhoto(photoId, updatedPhoto).subscribe((updated) => {
            observer.next(updated);
            observer.complete();
          });
        } else {
          observer.error(new Error('Photo not found'));
        }
      });
    });
  }
}
