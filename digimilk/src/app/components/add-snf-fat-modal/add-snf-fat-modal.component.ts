import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-snf-fat-modal',
  templateUrl: './add-snf-fat-modal.component.html',
  styleUrls: ['./add-snf-fat-modal.component.scss'],
})
export class AddSnfFatModalComponent {
  @Input() setMinSnfFat: any; // Receive data for editing
  isEdit:boolean=false;
  public isDarkMode: boolean = false;

  addSnfFatForm: FormGroup;
  milkTypes= ["Cow Milk","Buffalo Milk"]

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,    private  darkModeService: DarkModeService
  ) {
    this.addSnfFatForm = this.fb.group({
      id: [null],
      milkType: ['', Validators.required],
      minSnf: ['', [Validators.required, Validators.min(0)]],
      minFat: ['', [Validators.required, Validators.min(0)]],
      maxSnf: ['', [Validators.required, Validators.min(0)]],
      maxFat: ['', [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit() {
      this.isEdit = !!this.setMinSnfFat;
    if (this.setMinSnfFat) {
      this.addSnfFatForm.patchValue(this.setMinSnfFat); // Populate form with existing data
    }

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
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
