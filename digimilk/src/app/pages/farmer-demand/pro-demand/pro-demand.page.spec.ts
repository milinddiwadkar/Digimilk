import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProDemandPage } from './pro-demand.page';

describe('ProDemandPage', () => {
  let component: ProDemandPage;
  let fixture: ComponentFixture<ProDemandPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProDemandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
