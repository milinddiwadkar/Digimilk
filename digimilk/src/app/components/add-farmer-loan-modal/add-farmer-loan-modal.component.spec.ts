import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFarmerLoanModalComponent } from './add-farmer-loan-modal.component';

describe('AddFarmerLoanModalComponent', () => {
  let component: AddFarmerLoanModalComponent;
  let fixture: ComponentFixture<AddFarmerLoanModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFarmerLoanModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFarmerLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
