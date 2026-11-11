import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetail } from './post-detail';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PostDetail', () => {
  let component: PostDetail;
  let fixture: ComponentFixture<PostDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetail],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(PostDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
