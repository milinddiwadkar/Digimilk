import { Component, Input, OnInit } from '@angular/core';
import { IonPopover, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-payment-modal',
  templateUrl: './add-payment-modal.component.html',
  styleUrls: ['./add-payment-modal.component.scss'],
})
export class AddPaymentModalComponent implements OnInit {
  @Input() payment: any;
  paymentForm!: FormGroup;
  isEditMode: boolean = false;
  public isDarkMode: boolean = false;

  farmers = ['John Doe', 'Jane Smith', 'Mike Johnson'];
  societies = ['Society A', 'Society B', 'Society C'];
  paymentMethods = ['Cash', 'Bank Transfer', 'Cheque'];
  statuses = ['Pending', 'Completed'];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,    private  darkModeService: DarkModeService

  ) {}

  ngOnInit() {
    this.isEditMode = !!this.payment;

    this.paymentForm = this.formBuilder.group({
      farmerName: [this.payment?.farmerName || '', Validators.required],
      societyName: [this.payment?.societyName || '', Validators.required],
      paymentMethod: [this.payment?.paymentMethod || '', Validators.required],
      status: [this.payment?.status || '', Validators.required],
      paymentAmount: [this.payment?.paymentAmount || '', Validators.required],
      paymentDate: [this.payment?.paymentDate || '', Validators.required],
      transactionId: [this.payment?.transactionId || ''],
      description: [this.payment?.description || ''],
      adjustment: [this.payment?.adjustment || '']
    });


    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  onDateChange(field: string, event: any, popover: IonPopover) {
    const value = event.detail.value;
    this.paymentForm.get(field)?.setValue(value);

    // Automatically close the popover after selecting the date
    popover.dismiss();
  }
  openPopover(popover: IonPopover) {
    popover.present();
  }


  async submitForm() {
    if (this.paymentForm.valid) {
      await this.modalController.dismiss(this.paymentForm.value);
    }
  }

  async dismiss() {
    await this.modalController.dismiss();
  }
}
