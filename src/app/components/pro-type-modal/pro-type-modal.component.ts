import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pro-type-modal',
  templateUrl: './pro-type-modal.component.html',
  styleUrls: ['./pro-type-modal.component.scss'],
})
export class ProTypeModalComponent {
  proTypeForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
     this.proTypeForm = this.fb.group({
      name: ['', Validators.required],
      status: ['true', Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.proTypeForm.valid) {
      this.modalCtrl.dismiss(this.proTypeForm.value);
    }
  }
}
