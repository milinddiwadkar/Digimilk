import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MilkCollectionPage } from './milk-collection.page';

describe('MilkCollectionPage', () => {
  let component: MilkCollectionPage;
  let fixture: ComponentFixture<MilkCollectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
