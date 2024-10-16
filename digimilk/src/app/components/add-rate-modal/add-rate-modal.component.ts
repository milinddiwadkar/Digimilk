import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-rate-modal',
  templateUrl: './add-rate-modal.component.html',
  styleUrls: ['./add-rate-modal.component.scss'],
})
export class AddRateModalComponent {
  @Input() rateChart: any;
  isEdit:boolean=false;
  rateForm: FormGroup;
  public isDarkMode: boolean = false;

  milkTypes = ["Cow Milk", "Buffalo Milk"];

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,    private  darkModeService: DarkModeService
  ) {
    this.rateForm = this.fb.group({
      milkType: ['', Validators.required],
      snf: ['', [Validators.required, Validators.min(0)]],
      fat: ['', [Validators.required, Validators.min(0)]],
      ratePerLitre: ['', [Validators.required, Validators.min(0)]],
      createdAt: [new Date(), Validators.required], // Default to current date/time
    });
  }
  ngOnInit() {
    this.isEdit = !!this.rateChart;

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  submit() {
    if (this.rateForm.valid) {
      this.modalCtrl.dismiss(this.rateForm.value);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
