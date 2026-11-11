import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list';
import { PostDetailComponent } from './posts/post-detail/post-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '**', redirectTo: 'posts' }
];