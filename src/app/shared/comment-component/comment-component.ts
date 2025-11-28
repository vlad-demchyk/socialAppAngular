import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../interfaces/post';
import { Button } from '../button/button';
import { PostsService } from '../../core/services/postsService';
import { ProfileCard } from '../profile-card/profile-card';
import { InputComponent } from '../input-component/input-component';
@Component({
  selector: 'app-comment-component',
  imports: [
    CommonModule,
    Button,
    ProfileCard,
    InputComponent,
  ],
  templateUrl: './comment-component.html',
  styleUrl: './comment-component.scss',
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() postId: number | undefined;
  comments: Comment[] = [];
  commentsService = inject(PostsService);

  ngOnInit() {
    if (this.postId) {
      this.getComments();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['postId'] && this.postId) {
      this.getComments();
    }
  }

  likeComment(commentId: number) {
    console.log(`Like comment ${commentId}`);
  }

  replyToComment(commentId: number) {
    console.log(`Reply to comment ${commentId}`);
  }

  addComment() {
    console.log(`Add comment`);
  }

  getComments() {
    if (this.postId) {
      this.commentsService.getCommentsByPostId(this.postId).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }
}
