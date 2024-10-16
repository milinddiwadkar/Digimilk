import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPwdPage } from './forgot-pwd.page';

describe('ForgotPwdPage', () => {
  let component: ForgotPwdPage;
  let fixture: ComponentFixture<ForgotPwdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
