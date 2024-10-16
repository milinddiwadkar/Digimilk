import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmerLoanDetailPage } from './farmer-loan-detail.page';

describe('FarmerLoanDetailPage', () => {
  let component: FarmerLoanDetailPage;
  let fixture: ComponentFixture<FarmerLoanDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerLoanDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
