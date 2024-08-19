import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesPermissionsPage } from './roles-permissions.page';

describe('RolesPermissionsPage', () => {
  let component: RolesPermissionsPage;
  let fixture: ComponentFixture<RolesPermissionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPermissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
