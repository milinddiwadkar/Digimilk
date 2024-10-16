import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmerScreenMsgPage } from './farmer-screen-msg.page';

describe('FarmerScreenMsgPage', () => {
  let component: FarmerScreenMsgPage;
  let fixture: ComponentFixture<FarmerScreenMsgPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerScreenMsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
