import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-dr-demand-modal',
  templateUrl: './add-dr-demand-modal.component.html',
  styleUrls: ['./add-dr-demand-modal.component.scss'],
})
export class AddDrDemandModalComponent implements OnInit {
  @Input() drDemand: any;
  public isDarkMode: boolean = false;

  drDemandForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,    private  darkModeService: DarkModeService
  ) {
    this.drDemandForm = this.formBuilder.group({
      clinicName: ['', Validators.required],
      drName: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      speciality: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: [new Date(), Validators.required], // Ensure this is set

    });
  }

  ngOnInit() {
    if (this.drDemand) {
      this.drDemandForm.patchValue(this.drDemand);
    }

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  submitForm() {
    if (this.drDemandForm.valid) {
      this.modalController.dismiss(this.drDemandForm.value);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
