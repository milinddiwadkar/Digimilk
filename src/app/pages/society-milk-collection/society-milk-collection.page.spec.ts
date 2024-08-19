import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocietyMilkCollectionPage } from './society-milk-collection.page';

describe('SocietyMilkCollectionPage', () => {
  let component: SocietyMilkCollectionPage;
  let fixture: ComponentFixture<SocietyMilkCollectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyMilkCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
