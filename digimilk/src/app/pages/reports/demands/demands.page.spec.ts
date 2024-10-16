import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemandsPage } from './demands.page';

describe('DemandsPage', () => {
  let component: DemandsPage;
  let fixture: ComponentFixture<DemandsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
