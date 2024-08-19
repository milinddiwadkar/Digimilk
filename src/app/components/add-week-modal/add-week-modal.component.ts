import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-week-modal',
  templateUrl: './add-week-modal.component.html',
  styleUrls: ['./add-week-modal.component.scss'],
})
export class AddWeekModalComponent {
  @Input()
  form!: FormGroup;

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }
}
