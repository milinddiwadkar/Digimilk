import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocietyMilkCollPage } from './society-milk-coll.page';

describe('SocietyMilkCollPage', () => {
  let component: SocietyMilkCollPage;
  let fixture: ComponentFixture<SocietyMilkCollPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyMilkCollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
