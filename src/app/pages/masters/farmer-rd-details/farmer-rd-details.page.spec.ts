import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmerRdDetailsPage } from './farmer-rd-details.page';

describe('FarmerRdDetailsPage', () => {
  let component: FarmerRdDetailsPage;
  let fixture: ComponentFixture<FarmerRdDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerRdDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
