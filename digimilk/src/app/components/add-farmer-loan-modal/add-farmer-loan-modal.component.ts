import { Component, Input, OnInit } from '@angular/core';
import { IonPopover, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-farmer-loan-modal',
  templateUrl: './add-farmer-loan-modal.component.html',
  styleUrls: ['./add-farmer-loan-modal.component.scss'],
})
export class AddFarmerLoanModalComponent {
  @Input() loanDetail: any;
  addLoanForm: FormGroup;
  isEdit:boolean=false;
  farmerNames = ['Farmer A', 'Farmer B'];
  public isDarkMode: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,    private  darkModeService: DarkModeService

  ) {
    this.addLoanForm = this.fb.group({
      farmerName: ['', Validators.required],
      loanAccountNo: ['', Validators.required],
      loanAmount: ['', [Validators.required, Validators.min(0)]],
      interestRate: ['', [Validators.required, Validators.min(0)]],
      numberOfEMI: ['', [Validators.required, Validators.min(0)]],
      emi: ['', [Validators.required, Validators.min(0)]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.isEdit = !!this.loanDetail;


    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  onDateChange(field: string, event: any, popover: IonPopover) {
    const value = event.detail.value;
    this.addLoanForm.get(field)?.setValue(value);

    // Automatically close the popover after selecting the date
    popover.dismiss();
  }
  openPopover(popover: IonPopover) {
    popover.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.addLoanForm.valid) {
      this.modalCtrl.dismiss(this.addLoanForm.value);
    }
  }
}
