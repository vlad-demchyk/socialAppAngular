import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { SearchPage } from './pages/search-page/search-page';
import { GroupsPage } from './pages/groups-page/groups-page';
import { MessagesPage } from './pages/messages-page/messages-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { NextEventPage } from './pages/next-event-page/next-event-page';
import { LikesPage } from './pages/likes-page/likes-page';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPage },
  { path: 'groups', component: GroupsPage },
  { path: 'messages', component: MessagesPage },
  { path: 'whatsNext', component: NextEventPage },
  { path: 'search', component: SearchPage },
  { path: 'likes', component: LikesPage },
  { path: 'profile/:id', component: ProfilePage },
  { path: 'profile/me', component: ProfilePage },
];
