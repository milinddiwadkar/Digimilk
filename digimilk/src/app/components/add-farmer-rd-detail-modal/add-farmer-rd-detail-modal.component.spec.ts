import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFarmerRdDetailModalComponent } from './add-farmer-rd-detail-modal.component';

describe('AddFarmerRdDetailModalComponent', () => {
  let component: AddFarmerRdDetailModalComponent;
  let fixture: ComponentFixture<AddFarmerRdDetailModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFarmerRdDetailModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFarmerRdDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
