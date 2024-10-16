import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordpressStorePage } from './wordpress-store.page';

describe('WordpressStorePage', () => {
  let component: WordpressStorePage;
  let fixture: ComponentFixture<WordpressStorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
