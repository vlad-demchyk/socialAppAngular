import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post, Comment, CreatePostRequest, CreateCommentRequest } from '../../shared/interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  http: HttpClient = inject(HttpClient);
  
  private postsUrl = 'assets/jsonExample/posts.json';
  private commentsUrl = 'assets/jsonExample/comments.json';
  
  // Кеш для постів та коментарів (для роботи з заглушками)
  private postsCache: Post[] = [];
  private commentsCache: Comment[] = [];

  /**
   * Отримати всі пости
   */
  getPosts(): Observable<Post[]> {
    if (this.postsCache.length > 0) {
      return of(this.postsCache);
    }
    return new Observable(observer => {
      this.http.get<Post[]>(this.postsUrl).subscribe({
        next: (posts) => {
          this.postsCache = posts;
          observer.next(posts);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  /**
   * Отримати пост за ID
   */
  getPostById(postId: number): Observable<Post | undefined> {
    return new Observable(observer => {
      this.getPosts().subscribe(posts => {
        const post = posts.find(p => p.id === postId);
        observer.next(post);
        observer.complete();
      });
    });
  }

  /**
   * Отримати пости конкретного користувача
   */
  getPostsByUserId(userId: number): Observable<Post[]> {
    return new Observable(observer => {
      this.getPosts().subscribe(posts => {
        const userPosts = posts.filter(p => p.userId === userId);
        observer.next(userPosts);
        observer.complete();
      });
    });
  }

  /**
   * Створити новий пост
   */
  createPost(postData: CreatePostRequest): Observable<Post> {
    const newPost: Post = {
      id: Date.now(), // Тимчасовий ID, в реальному додатку буде з сервера
      userId: postData.userId,
      authorId: postData.userId,
      userName: '', // Буде заповнено з профілю користувача
      profilePhoto: '', // Буде заповнено з профілю користувача
      publicationDate: new Date().toISOString(),
      text: postData.text,
      likes: 0,
      shares: 0,
      imageUrl: postData.imageUrl,
      videoUrl: postData.videoUrl,
    };

    // Додаємо до кешу (в реальному додатку - POST запит на сервер)
    this.postsCache = [newPost, ...this.postsCache];
    
    return of(newPost);
  }

  /**
   * Оновити пост
   */
  updatePost(postId: number, updates: Partial<Post>): Observable<Post> {
    return new Observable(observer => {
      this.getPosts().subscribe(posts => {
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
          const updatedPost = { ...posts[index], ...updates };
          posts[index] = updatedPost;
          this.postsCache = posts;
          observer.next(updatedPost);
        } else {
          observer.error(new Error('Post not found'));
        }
        observer.complete();
      });
    });
  }

  /**
   * Видалити пост
   */
  deletePost(postId: number): Observable<boolean> {
    return new Observable(observer => {
      this.getPosts().subscribe(posts => {
        this.postsCache = posts.filter(p => p.id !== postId);
        observer.next(true);
        observer.complete();
      });
    });
  }

  /**
   * Лайкнути/зняти лайк з посту
   */
  toggleLike(postId: number, userId: number): Observable<Post> {
    return new Observable(observer => {
      this.getPostById(postId).subscribe(post => {
        if (post) {
          // В реальному додатку тут буде перевірка, чи вже лайкнув користувач
          const updatedPost = {
            ...post,
            likes: post.likes + 1, // Спрощена логіка, в реальному додатку потрібна перевірка
          };
          this.updatePost(postId, updatedPost).subscribe(updated => {
            observer.next(updated);
            observer.complete();
          });
        } else {
          observer.error(new Error('Post not found'));
        }
      });
    });
  }

  /**
   * Отримати коментарі для посту
   */
  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return new Observable(observer => {
      this.getComments().subscribe(comments => {
        const postComments = comments.filter(c => c.postId === postId);
        observer.next(postComments);
        observer.complete();
      });
    });
  }

  /**
   * Отримати всі коментарі
   */
  getComments(): Observable<Comment[]> {
    if (this.commentsCache.length > 0) {
      return of(this.commentsCache);
    }
    return new Observable(observer => {
      this.http.get<Comment[]>(this.commentsUrl).subscribe({
        next: (comments) => {
          this.commentsCache = comments;
          observer.next(comments);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  /**
   * Створити коментар
   */
  createComment(commentData: CreateCommentRequest): Observable<Comment> {
    const newComment: Comment = {
      id: Date.now(),
      postId: commentData.postId,
      userId: commentData.userId,
      userName: '', // Буде заповнено з профілю користувача
      profilePhoto: '', // Буде заповнено з профілю користувача
      text: commentData.text,
      publicationDate: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    // Додаємо до кешу
    this.commentsCache = [...this.commentsCache, newComment];
    
    return of(newComment);
  }

  /**
   * Створити відповідь на коментар
   */
  createReply(commentId: number, replyData: CreateCommentRequest): Observable<Comment> {
    return new Observable(observer => {
      this.getComments().subscribe(comments => {
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
          const newReply = {
            id: Date.now(),
            commentId: commentId,
            userId: replyData.userId,
            userName: '', // Буде заповнено з профілю користувача
            profilePhoto: '', // Буде заповнено з профілю користувача
            text: replyData.text,
            publicationDate: new Date().toISOString(),
            likes: 0,
            isAuthorReply: false, // Потрібно перевірити, чи автор посту відповідає
          };

          comment.replies.push(newReply);
          this.commentsCache = comments;
          
          observer.next(comment);
        } else {
          observer.error(new Error('Comment not found'));
        }
        observer.complete();
      });
    });
  }

  /**
   * Лайкнути коментар
   */
  toggleCommentLike(commentId: number): Observable<Comment> {
    return new Observable(observer => {
      this.getComments().subscribe(comments => {
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
          comment.likes += 1;
          this.commentsCache = comments;
          observer.next(comment);
        } else {
          observer.error(new Error('Comment not found'));
        }
        observer.complete();
      });
    });
  }

  /**
   * Видалити коментар
   */
  deleteComment(commentId: number): Observable<boolean> {
    return new Observable(observer => {
      this.getComments().subscribe(comments => {
        this.commentsCache = comments.filter(c => c.id !== commentId);
        observer.next(true);
        observer.complete();
      });
    });
  }
}

