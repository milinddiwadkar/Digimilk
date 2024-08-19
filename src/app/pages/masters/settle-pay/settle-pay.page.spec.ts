import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettlePayPage } from './settle-pay.page';

describe('SettlePayPage', () => {
  let component: SettlePayPage;
  let fixture: ComponentFixture<SettlePayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlePayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
