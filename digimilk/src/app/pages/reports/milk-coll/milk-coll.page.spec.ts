import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MilkCollPage } from './milk-coll.page';

describe('MilkCollPage', () => {
  let component: MilkCollPage;
  let fixture: ComponentFixture<MilkCollPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
