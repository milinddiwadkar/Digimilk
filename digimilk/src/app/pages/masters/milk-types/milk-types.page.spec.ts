import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MilkTypesPage } from './milk-types.page';

describe('MilkTypesPage', () => {
  let component: MilkTypesPage;
  let fixture: ComponentFixture<MilkTypesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
