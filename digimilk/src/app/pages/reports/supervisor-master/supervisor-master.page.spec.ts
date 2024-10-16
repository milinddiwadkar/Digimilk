import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupervisorMasterPage } from './supervisor-master.page';

describe('SupervisorMasterPage', () => {
  let component: SupervisorMasterPage;
  let fixture: ComponentFixture<SupervisorMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
