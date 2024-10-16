import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-pro-type-modal',
  templateUrl: './pro-type-modal.component.html',
  styleUrls: ['./pro-type-modal.component.scss'],
})
export class ProTypeModalComponent {
  @Input() proType: any;
  isEdit:boolean=false;
  public isDarkMode: boolean = false;

  proTypeForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,    private  darkModeService: DarkModeService

  ) {
     this.proTypeForm = this.fb.group({
      name: ['', Validators.required],
      status: ['Active', Validators.required],
      createdAt: [new Date(), Validators.required], // Ensure this is set
    });
  }
  ngOnInit(): void {
      this.isEdit = !!this.proType;
    
    throw new Error('Method not implemented.');

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
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
