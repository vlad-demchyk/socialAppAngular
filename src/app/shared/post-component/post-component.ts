import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, Comment } from '../interfaces/post';
import { CommentComponent } from '../comment-component/comment-component';
import { Button } from '../button/button';
import { ProfileCard } from '../profile-card/profile-card';

@Component({
  selector: 'app-post-component',
  imports: [CommonModule, CommentComponent, Button, ProfileCard],
  templateUrl: './post-component.html',
  styleUrl: './post-component.scss',
})
export class PostComponent {
  @Input() post!: Post; 
  @Input() comments: Comment[] = [];

  commentsVisible = false;

  likePost() {
    console.log(`Like post`);
  }
  
  sharePost() {
    console.log(`Share post`);
  }
  
  addComment(comment: Comment) {
    console.log(`Add comment`);
  }

  commentsToggle() {
    this.commentsVisible = !this.commentsVisible;
  }
}
