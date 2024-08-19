import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-snf-fat-modal',
  templateUrl: './add-snf-fat-modal.component.html',
  styleUrls: ['./add-snf-fat-modal.component.scss'],
})
export class AddSnfFatModalComponent {
  addSnfFatForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.addSnfFatForm = this.fb.group({
      milkType: ['', Validators.required],
      minSnf: ['', [Validators.required, Validators.min(0)]],
      minFat: ['', [Validators.required, Validators.min(0)]],
      maxSnf: ['', [Validators.required, Validators.min(0)]],
      maxFat: ['', [Validators.required, Validators.min(0)]],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.addSnfFatForm.valid) {
      this.modalCtrl.dismiss(this.addSnfFatForm.value);
    }
  }
}
