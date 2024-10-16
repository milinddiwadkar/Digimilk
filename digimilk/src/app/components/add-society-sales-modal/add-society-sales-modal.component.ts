import { Component, input, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonPopover, ModalController } from '@ionic/angular';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-society-sales-modal',
  templateUrl: './add-society-sales-modal.component.html',
  styleUrls: ['./add-society-sales-modal.component.scss'],
})
export class AddSocietySalesModalComponent  implements OnInit {
  @Input() societySales: any;
    addSocietySalesForm!: FormGroup;
  isEdit: boolean = false;
  public isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController,    private  darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.isEdit = !!this.societySales;

    this.addSocietySalesForm = this.fb.group({
      invoice_id: ['', Validators.required],
      customer_id: ['', Validators.required],
      invoice_date: ['', Validators.required],
      total_amount: ['',[ Validators.required, Validators.min(0)]],
      due_date: [''],
      status: ['Active',Validators.required],
      org_id: ['',Validators.required],
      created_by: ['',Validators.required],
      createdAT: [new Date(), Validators.required], // Ensure this is set

    });

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  onDateChange(field: string, event: any, popover: IonPopover) {
    const value = event.detail.value;
    this.addSocietySalesForm.get(field)?.setValue(value);

    // Automatically close the popover after selecting the date
    popover.dismiss();
  }
  openPopover(popover: IonPopover) {
    popover.present();
  }


  onSubmit() {
    if (this.addSocietySalesForm.valid) {
      this.modalCtrl.dismiss(this.addSocietySalesForm.value);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

