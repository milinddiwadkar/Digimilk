import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmersPage } from './farmers.page';

describe('FarmersPage', () => {
  let component: FarmersPage;
  let fixture: ComponentFixture<FarmersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
