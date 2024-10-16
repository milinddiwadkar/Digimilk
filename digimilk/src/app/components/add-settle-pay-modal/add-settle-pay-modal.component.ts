import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonPopover, ModalController } from '@ionic/angular';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-settle-pay-modal',
  templateUrl: './add-settle-pay-modal.component.html',
  styleUrls: ['./add-settle-pay-modal.component.scss'],
})
export class AddSettlePayModalComponent implements OnInit {
  @Input() settlePay: any;
  isEdit: boolean = false;
  public isDarkMode: boolean = false;

  addSettlePayForm!: FormGroup;
  @Input() settlePays = {
    society: '',
    farmer: '',
    settlementAmount: null,
    settlementDate: null,
    adjust: ''
  };

  constructor(private fb: FormBuilder, private modalCtrl: ModalController,    private  darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.isEdit = !!this.settlePay;

    this.addSettlePayForm = this.fb.group({
      society: ['', Validators.required],
      farmer: ['', Validators.required],
      settlementAmount: [null, [Validators.required, Validators.min(0)]],
      settlementDate: ['', Validators.required],
      adjust: [''],
      description: ['',Validators.required],
      head: ['',Validators.required]
    });

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  onDateChange(field: string, event: any, popover: IonPopover) {
    const value = event.detail.value;
    this.addSettlePayForm.get(field)?.setValue(value);

    // Automatically close the popover after selecting the date
    popover.dismiss();
  }
  openPopover(popover: IonPopover) {
    popover.present();
  }


  onSubmit() {
    if (this.addSettlePayForm.valid) {
      this.modalCtrl.dismiss(this.addSettlePayForm.value);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
