import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-milk-type-modal',
  templateUrl: './add-milk-type-modal.component.html',
  styleUrls: ['./add-milk-type-modal.component.scss'],
})
export class AddMilkTypeModalComponent {
  @Input() milkType: any;
  addMilkTypeForm: FormGroup;
  isEdit: boolean = false;
  public isDarkMode: boolean = false;

  milkTypes= ["Cow Milk","Buffalo Milk"]

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,    private  darkModeService: DarkModeService

  ) {
    this.addMilkTypeForm = this.fb.group({
      name: ['', Validators.required],
      status: ['Active', Validators.required],
      createdAt: [new Date(), Validators.required], // Ensure this is set
    });
  }

  ngOnInit() {
    this.isEdit = !!this.milkType;

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    }); this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
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
