import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenMsgPage } from './screen-msg.page';

describe('ScreenMsgPage', () => {
  let component: ScreenMsgPage;
  let fixture: ComponentFixture<ScreenMsgPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenMsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
