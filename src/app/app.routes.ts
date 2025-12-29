import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { SearchPage } from './pages/search-page/search-page';
import { GroupsPage } from './pages/groups-page/groups-page';
import { MessagesPage } from './pages/messages-page/messages-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { NextEventPage } from './pages/next-event-page/next-event-page';
import { LikesPage } from './pages/likes-page/likes-page';
import { Layout } from './core/layout/layout';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { ForgotPassword } from './pages/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: HomeComponent },
      { path: 'groups', component: GroupsPage },
      { path: 'messages', component: MessagesPage },
      { path: 'whatsNext', component: NextEventPage },
      { path: 'search', component: SearchPage },
      { path: 'likes', component: LikesPage },
      { path: 'profile/:id', component: ProfilePage },
      { path: 'profile/me', component: ProfilePage },
    ],
  },
  { path: 'login', component: LoginPage },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'forgot-password', component: ForgotPassword },
];
