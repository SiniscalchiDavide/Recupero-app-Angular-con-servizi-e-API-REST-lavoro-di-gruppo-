import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post-service';

@Component({ 
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetail implements OnInit { // Classe del componente; 'implements OnInit' obbliga a definire il metodo ngOnInit
  readonly postService = inject(PostService); // Inietta il servizio dei post (pubblico e in sola lettura, usabile anche nell'HTML)
  private readonly route = inject(ActivatedRoute); // Inietta lo strumento per leggere i parametri dell'URL attuale (es. l'ID)
  private readonly router = inject(Router); // Inietta il router per navigare verso altre pagine via codice

  currentId = 1;

  ngOnInit(): void {
    // Ascolta in modo reattivo i cambiamenti del parametro :id dall'URL
    this.route.paramMap.subscribe(params => { // Si iscrive ai cambi dell'URL: scatta ogni volta che cambia l'ID nella barra degli indirizzi
      const idParam = params.get('id'); // Estrae il valore del parametro 'id' dall'URL come stringa (o null se manca)
      this.currentId = idParam ? Number(idParam) : 1; // Se idParam esiste lo converte in numero, altrimenti imposta 1 come predefinito
      this.postService.loadPostById(this.currentId); // Chiede al servizio di scaricare dall'API il post corrispondente a questo ID
    });
  } 

  cambiaPost(nuovoId: number): void { // Metodo chiamato (es. dai pulsanti Avanti/Indietro) per cambiare post
    const totalePost = this.postService.posts().length;
    if (nuovoId < 1 || (totalePost > 0 && nuovoId > totalePost)) return;
    this.router.navigate(['/posts', nuovoId]);
  }
}