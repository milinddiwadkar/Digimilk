import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageWeekPage } from './manage-week.page';

describe('ManageWeekPage', () => {
  let component: ManageWeekPage;
  let fixture: ComponentFixture<ManageWeekPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWeekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
