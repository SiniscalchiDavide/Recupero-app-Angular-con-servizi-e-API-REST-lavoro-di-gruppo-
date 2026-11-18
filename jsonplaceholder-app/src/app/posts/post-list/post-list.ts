import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post-service'; // Import corretto con ../../

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList implements OnInit {
  // Inietta il servizio per comunicare con l'API e condividere lo stato dei post
  readonly postService = inject(PostService);

  // Signal reattivo che memorizza il testo digitato nella barra di ricerca
  readonly filtro = signal('');
  nuovoTitolo = '';

  // Signal calcolato: aggiorna automaticamente la lista filtrata quando cambia il filtro o arrivano nuovi post
  readonly postFiltrati = computed(() => {
    const testo = this.filtro().toLowerCase();
    return this.postService.posts().filter(p => p.title.toLowerCase().includes(testo));
  });

  ngOnInit(): void {
    this.postService.clearError();
    // Scarica i post dal server solo se la lista in memoria è ancora vuota
    if (this.postService.posts().length === 0) {
      this.postService.loadPosts();
    }
  }

  inviaPost(): void {
    // Evita l'invio di post vuoti o composti solo da spazi
    if (!this.nuovoTitolo.trim()) return;
    
    // Invia il nuovo post tramite POST e resetta il campo di input
    this.postService.addPost({ userId: 1, title: this.nuovoTitolo, body: 'Contenuto di prova' });
    this.nuovoTitolo = '';
  }
}
