import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteMasterPage } from './route-master.page';

describe('RouteMasterPage', () => {
  let component: RouteMasterPage;
  let fixture: ComponentFixture<RouteMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
