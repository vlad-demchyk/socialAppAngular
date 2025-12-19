import { Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../core/services/postsService';
import { Post } from '../../shared/interfaces/post';
// import { PostComponent } from '../../shared/post-component/post-component';
import { Button } from '../../shared/button/button';
import { ProfileCard } from '../../shared/profile-card/profile-card';

import { UserService } from '../../core/services/userService';
import { User } from '../../shared/interfaces/user.interface';
import { Feed } from '../../shared/feed/feed';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Button, ProfileCard, Feed],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  postsService = inject(PostsService);
  userService = inject(UserService);
  // posts: Post[] = [];
  myProfile: User | undefined = undefined;

  constructor() {
      // this.postsService.getPosts().subscribe((posts) => {
      //   this.posts = posts;
      // });

    this.userService.getMe().subscribe((profile) => {
      this.myProfile = profile;
    });
  }
}
