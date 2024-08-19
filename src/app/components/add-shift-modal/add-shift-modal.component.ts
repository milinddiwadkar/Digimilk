import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-shift-modal',
  templateUrl: './add-shift-modal.component.html',
  styleUrls: ['./add-shift-modal.component.scss'],
})
export class AddShiftModalComponent {
  addShiftForm: FormGroup = this.fb.group({
    shift: ['', Validators.required],
    status: [true, Validators.required] // Default value for status
  });

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.addShiftForm.valid) {
      this.modalCtrl.dismiss(this.addShiftForm.value); // Dismiss with the form data
    } else {
      console.log("Form is invalid");
    }
  }
}
