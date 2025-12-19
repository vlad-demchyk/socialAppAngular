import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';
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
  @Input() key!: string;
  @Input() post!: Post; 

  commentsVisible = false;

  likePost() {
    console.log(`Like post`);
  }
  
  sharePost() {
    console.log(`Share post`);
  }


  commentsToggle() {
    this.commentsVisible = !this.commentsVisible;
  }
}
