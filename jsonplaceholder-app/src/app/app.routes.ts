import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent }
];