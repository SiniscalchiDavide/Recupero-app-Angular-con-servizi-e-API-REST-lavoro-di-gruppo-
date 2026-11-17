import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../modelli/post';

// Rende il servizio un Singleton condiviso in tutta l'applicazione
@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Signals privati: lo stato è modificabile esclusivamente all'interno di questo servizio
  private readonly _posts = signal<Post[]>([]);
  private readonly _selectedPost = signal<Post | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Espone i Signals in sola lettura per impedire modifiche accidentali dai componenti
  readonly posts = this._posts.asReadonly();
  readonly selectedPost = this._selectedPost.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Recupera l'intero elenco dei post tramite richiesta GET
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

  // Recupera i dettagli di un singolo post dato il suo ID
  loadPostById(id: number): void {
    this._loading.set(true);
    this._error.set(null);
    this._selectedPost.set(null); // Resetta il post precedente per evitare di mostrarlo durante il caricamento
    this.http.get<Post>(`${this.baseUrl}/${id}`).subscribe({
      next: (data) => {
        this._selectedPost.set(data);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  // Invia un nuovo post tramite POST e lo aggiunge in cima alla lista locale
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
  clearError(): void {
    this._error.set(null);
  }


  // Gestione centralizzata degli errori HTTP con messaggi leggibili per l'utente
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
