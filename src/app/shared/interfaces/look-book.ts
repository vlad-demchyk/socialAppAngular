import { User } from './user.interface';

export interface Photo extends User {
  id: number;
  userId: number;
  authorId: number;
  userName: string;
  profilePhoto: string;
  publicationDate: string;
  photoUrl: string;
  photoContentText?: string;
  likes?: number;
  shares?: number;
}

export interface CreatePhotoRequest {
  id: number;
  publicationDate: string;
  userId: number;
  authorId: number;
  photoUrl: File | string;
  photoContentText?: string;
}