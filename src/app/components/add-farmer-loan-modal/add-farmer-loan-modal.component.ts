import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-farmer-loan-modal',
  templateUrl: './add-farmer-loan-modal.component.html',
  styleUrls: ['./add-farmer-loan-modal.component.scss'],
})
export class AddFarmerLoanModalComponent {
  addLoanForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.addLoanForm = this.fb.group({
      farmerName: ['', Validators.required],
      loanAccountNo: ['', Validators.required],
      loanAmount: ['', [Validators.required, Validators.min(0)]],
      interestRate: ['', [Validators.required, Validators.min(0)]],
      noOfEmi: ['', [Validators.required, Validators.min(0)]],
      emi: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.addLoanForm.valid) {
      this.modalCtrl.dismiss(this.addLoanForm.value);
    }
  }
}
