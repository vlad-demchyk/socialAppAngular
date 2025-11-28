import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, of, shareReplay, take, tap } from 'rxjs';
import { User, UserProfile } from '../../shared/interfaces/user.interface';
import { UserDetails } from '../../shared/interfaces/user-details.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);

  private currentUserUrl = 'assets/jsonExample/current-user.json';
  private userProfileUrl = 'assets/jsonExample/user-profile.json';
  private userProfileCache: UserDetails | null = null;

  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadCurrentUser().subscribe();
  }

  private loadCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.currentUserUrl).pipe(
      tap((user) => this.currentUserSubject.next(user)),
      shareReplay(1)
    );
  }

  getMe(): Observable<UserProfile> {
    const cachedUser = this.currentUserSubject.getValue();
    if (cachedUser) {
      return of(cachedUser);
    }
    return this.currentUser$.pipe(
      filter((user): user is UserProfile => user !== null),
      take(1)
    );
  }

  getMyProfile(): Observable<UserDetails> {
    if (this.userProfileCache) {
      return of(this.userProfileCache);
    }
    return new Observable((observer) => {
      this.http.get<UserDetails>(this.userProfileUrl).subscribe({
        next: (profile) => {
          this.userProfileCache = profile;
          observer.next(profile);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  getUserById(userId: number): Observable<UserProfile> {
    return null as any;
  }

  getUserProfileById(userId: number | string): Observable<UserDetails> {
    return null as any;
  }

  getUsersByIds(userIds: number[]): Observable<User[]> {
    return null as any;
  }
  getUsersByFilterName(userId: number): Observable<User[]> {
    return null as any;
  }
}
