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
export class PostListComponent implements OnInit {
  readonly postService = inject(PostService);
  
  readonly filtro = signal('');
  nuovoTitolo = '';

  readonly postFiltrati = computed(() => {
    const testo = this.filtro().toLowerCase();
    return this.postService.posts().filter(p => p.title.toLowerCase().includes(testo));
  });

  ngOnInit(): void {
    if (this.postService.posts().length === 0) {
      this.postService.loadPosts();
    }
  }

  inviaPost(): void {
    if (!this.nuovoTitolo.trim()) return;
    this.postService.addPost({ userId: 1, title: this.nuovoTitolo, body: 'Contenuto di prova' });
    this.nuovoTitolo = '';
  }
}