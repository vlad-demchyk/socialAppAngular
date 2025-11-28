import { User } from './user.interface';

export interface Post extends User {
  id: number;
  authorId: number;
  publicationDate: string;
  text: string;
  likes: number;
  shares: number;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Comment extends User {
  id: number;
  postId: number;
  text: string;
  publicationDate: string;
  likes: number;
  replies: Reply[];
}

export interface Reply extends User {
  id: number;
  commentId: number;
  text: string;
  publicationDate: string;
  likes: number;
  isAuthorReply: boolean;
}

export interface CreatePostRequest {
  userId: number;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface CreateCommentRequest {
  postId: number;
  userId: number;
  text: string;
  parentCommentId?: number;
}
