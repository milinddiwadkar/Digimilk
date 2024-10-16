import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSocietyMilkCollectionModalComponent } from './add-society-milk-collection-modal.component';

describe('AddSocietyMilkCollectionModalComponent', () => {
  let component: AddSocietyMilkCollectionModalComponent;
  let fixture: ComponentFixture<AddSocietyMilkCollectionModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSocietyMilkCollectionModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSocietyMilkCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
