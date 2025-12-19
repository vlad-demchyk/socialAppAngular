import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../core/services/userService';
import { of } from 'rxjs';
import { UserDetails } from '../../shared/interfaces/user-details.interface';
import { PillWrapperComponent } from '../../shared/pill-wrapper-component/pill-wrapper-component';
import { Feed } from '../../shared/feed/feed';
import { AboutModalService } from '../../core/services/aboutProfile-modal-service';
@Component({
  selector: 'app-profile-page',
  imports: [
    PillWrapperComponent,
    Feed,
    //  AsyncPipe
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  protected aboutModalService = inject(AboutModalService);
  protected profile: UserDetails | null = null;
  protected userQuery: string | number | null = null;
  protected isShowMore: boolean = false;

  public modalAboutOpen$ = this.aboutModalService.modalState$;
  public modalAboutActive$ = this.aboutModalService.modalActiveState$;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  // protected onShow() {
  //   this.isShowMore = !this.isShowMore;
  // }

  ngOnInit(): void {
    // 1. Отримання ID з URL
    this.route.paramMap
      .pipe(
        // switchMap дозволяє автоматично скасовувати попередні HTTP-запити
        // якщо користувач швидко переходить між профілями.
        switchMap((params) => {
          this.userQuery = params.get('id');

          if (this.userQuery === 'me') {
            // 2. Якщо URL = /profile/me
            return this.userService.getMyProfile();
          } else if (this.userQuery) {
            // 3. Якщо URL = /profile/123
            return this.userService.getUserProfileById(this.userQuery);
          }
          // Якщо ID немає (що не повинно відбуватися з цією конфігурацією)
          return of(null);
        })
      )
      .subscribe((profileData) => {
        // 4. Оновлення даних профілю
        this.profile = profileData;
      });
  }
}
