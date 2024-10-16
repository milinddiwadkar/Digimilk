import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocietySamitiPage } from './society-samiti.page';

describe('SocietySamitiPage', () => {
  let component: SocietySamitiPage;
  let fixture: ComponentFixture<SocietySamitiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietySamitiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
