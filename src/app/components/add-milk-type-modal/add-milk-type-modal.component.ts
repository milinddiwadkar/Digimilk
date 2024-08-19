import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-milk-type-modal',
  templateUrl: './add-milk-type-modal.component.html',
  styleUrls: ['./add-milk-type-modal.component.scss'],
})
export class AddMilkTypeModalComponent {
  addMilkTypeForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.addMilkTypeForm = this.fb.group({
      name: ['', Validators.required],
      milkType: ['', Validators.required],
      status: ['true', Validators.required],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.addMilkTypeForm.valid) {
      this.modalCtrl.dismiss(this.addMilkTypeForm.value);
    }
  }
}
