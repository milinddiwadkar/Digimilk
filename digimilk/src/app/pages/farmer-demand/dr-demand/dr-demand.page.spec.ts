import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrDemandPage } from './dr-demand.page';

describe('DrDemandPage', () => {
  let component: DrDemandPage;
  let fixture: ComponentFixture<DrDemandPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrDemandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
