import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostComponent } from '../post-component/post-component';
import { Post } from '../interfaces/post';
import { PostsService } from '../../core/services/postsService';
import { LookBook } from '../look-book/look-book';
import { Button } from '../button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, PostComponent, LookBook, Button],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit, OnChanges {
  @Input() userId?: number | null = null;

  postsService = inject(PostsService);
  posts: Post[] = [];
  selectedTab: 'feed' | 'look-book' = 'feed';
  isLoading = true;

  ngOnInit() {
    this.loadPosts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      this.loadPosts();
    }
  }

  loadPosts() {
    this.isLoading = true;
    if (this.userId) {
      this.postsService.getPostsByUserId(this.userId).subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
    } else {
      this.postsService.getPosts().subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
    }
  }

  switchTab(tab: 'feed' | 'look-book') {
    this.selectedTab = tab;
  }
}
