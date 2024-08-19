import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocietySalesPage } from './society-sales.page';

describe('SocietySalesPage', () => {
  let component: SocietySalesPage;
  let fixture: ComponentFixture<SocietySalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietySalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
