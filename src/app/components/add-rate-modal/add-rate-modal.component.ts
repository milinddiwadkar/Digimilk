import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-rate-modal',
  templateUrl: './add-rate-modal.component.html',
  styleUrls: ['./add-rate-modal.component.scss'],
})
export class AddRateModalComponent {
  rateForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.rateForm = this.fb.group({
      milkType: ['', Validators.required],
      snf: ['', [Validators.required, Validators.min(0)]],
      fat: ['', [Validators.required, Validators.min(0)]],
      ratePerLitre: ['', [Validators.required, Validators.min(0)]],
    });
  }

  submit() {
    if (this.rateForm.valid) {
      this.modalCtrl.dismiss(this.rateForm.value);
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
