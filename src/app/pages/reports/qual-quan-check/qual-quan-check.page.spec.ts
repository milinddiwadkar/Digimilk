import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualQuanCheckPage } from './qual-quan-check.page';

describe('QualQuanCheckPage', () => {
  let component: QualQuanCheckPage;
  let fixture: ComponentFixture<QualQuanCheckPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QualQuanCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
