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
export class PostDetailComponent implements OnInit {
  readonly postService = inject(PostService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  currentId = 1;

  ngOnInit(): void {
    // Ascolta in modo reattivo i cambiamenti del parametro :id dall'URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.currentId = idParam ? Number(idParam) : 1;
      this.postService.loadPostById(this.currentId);
    });
  }

  cambiaPost(nuovoId: number): void {
    if (nuovoId < 1) return;
    this.router.navigate(['/posts', nuovoId]);
  }
}