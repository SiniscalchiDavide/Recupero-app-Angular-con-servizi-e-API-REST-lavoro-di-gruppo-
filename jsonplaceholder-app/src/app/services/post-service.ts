import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../modelli/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  private readonly _posts = signal<Post[]>([]);
  private readonly _selectedPost = signal<Post | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly posts = this._posts.asReadonly();
  readonly selectedPost = this._selectedPost.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadPosts(): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<Post[]>(this.baseUrl).subscribe({
      next: (data) => {
        this._posts.set(data);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  loadPostById(id: number): void {
    this._loading.set(true);
    this._error.set(null);
    this._selectedPost.set(null);
    this.http.get<Post>(`${this.baseUrl}/${id}`).subscribe({
      next: (data) => {
        this._selectedPost.set(data);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  addPost(nuovo: Omit<Post, 'id'>): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.post<Post>(this.baseUrl, nuovo).subscribe({
      next: (created) => {
        this._posts.update(lista => [created, ...lista]);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  private handleError(err: HttpErrorResponse): void {
    this._loading.set(false);
    if (err.status === 0) {
      this._error.set('Connessione assente o problema di rete (Stato 0).');
    } else if (err.status === 404) {
      this._error.set('Elemento non trovato (Errore 404).');
    } else {
      this._error.set(`Errore ${err.status}: ${err.message}`);
    }
  }
}