import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocietyDemandsPage } from './society-demands.page';

describe('SocietyDemandsPage', () => {
  let component: SocietyDemandsPage;
  let fixture: ComponentFixture<SocietyDemandsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyDemandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
