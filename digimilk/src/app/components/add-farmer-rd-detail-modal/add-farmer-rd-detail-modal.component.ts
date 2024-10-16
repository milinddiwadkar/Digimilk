import { Component, Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonPopover, ModalController } from '@ionic/angular';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-farmer-rd-detail-modal',
  templateUrl: './add-farmer-rd-detail-modal.component.html',
  styleUrls: ['./add-farmer-rd-detail-modal.component.scss'],
})
export class AddFarmerRdDetailModalComponent {
  @Input() rdDetail: any;
  addFarmerRdDetailForm: FormGroup;
  isEdit: boolean = false;
  farmerNames = ['Farmer A', 'Farmer B'];
  public isDarkMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,    private  darkModeService: DarkModeService

  ) {
    this.addFarmerRdDetailForm = this.fb.group({
      farmerName: ['', Validators.required],
      tenureAmount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      noOfMonths: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      // Add more fields as needed
      maturityAmount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      startDate: ['', Validators.required],
      interestRate: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
    });
  }

  ngOnInit() {
    this.isEdit = !!this.rdDetail;

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
  onDateChange(field: string, event: any, popover: IonPopover) {
    const value = event.detail.value;
    this.addFarmerRdDetailForm.get(field)?.setValue(value);

    // Automatically close the popover after selecting the date
    popover.dismiss();
  }
  openPopover(popover: IonPopover) {
    popover.present();
  }


  save() {
    if (this.addFarmerRdDetailForm.valid) {
      // Close the modal and return data
      this.modalController.dismiss(this.addFarmerRdDetailForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
