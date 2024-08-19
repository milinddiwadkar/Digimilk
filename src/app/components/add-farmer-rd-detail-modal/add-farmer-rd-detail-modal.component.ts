import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-farmer-rd-detail-modal',
  templateUrl: './add-farmer-rd-detail-modal.component.html',
  styleUrls: ['./add-farmer-rd-detail-modal.component.scss'],
})
export class AddFarmerRdDetailModalComponent {
  addFarmerRdDetailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
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
