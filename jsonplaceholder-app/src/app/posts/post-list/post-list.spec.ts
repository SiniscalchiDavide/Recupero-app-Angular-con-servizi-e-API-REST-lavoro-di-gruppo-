import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostList } from './post-list';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PostList', () => {
  let component: PostList;
  let fixture: ComponentFixture<PostList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostList],
      providers: [
        provideRouter([]),   // Fornisce le dipendenze del router
        provideHttpClient() // Fornisce HttpClient per PostService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
