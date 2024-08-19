import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RateChartPage } from './rate-chart.page';

describe('RateChartPage', () => {
  let component: RateChartPage;
  let fixture: ComponentFixture<RateChartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RateChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
