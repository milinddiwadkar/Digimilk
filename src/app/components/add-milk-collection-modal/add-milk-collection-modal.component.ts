import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-milk-collection-modal',
  templateUrl: './add-milk-collection-modal.component.html',
  styleUrls: ['./add-milk-collection-modal.component.scss'],
})
export class AddMilkCollectionModalComponent {
  @Input() form!: FormGroup;
  @Input() milkCollection: any = null;

  constructor(private modalCtrl: ModalController) {}

  submitForm() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
