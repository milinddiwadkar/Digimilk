import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProTypePage } from './pro-type.page';

describe('ProTypePage', () => {
  let component: ProTypePage;
  let fixture: ComponentFixture<ProTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
