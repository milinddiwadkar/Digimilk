import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-route-modal',
  templateUrl: './add-route-modal.component.html',
  styleUrls: ['./add-route-modal.component.scss'],
})
export class AddRouteModalComponent {
  @Input() form!: FormGroup;

  constructor(private modalCtrl: ModalController) {}

  submit() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
