import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-product-demand-modal',
  templateUrl: './add-product-demand-modal.component.html',
  styleUrls: ['./add-product-demand-modal.component.scss'],
})
export class AddProductDemandModalComponent implements OnInit {
  @Input() productDemand: any;
  productDemandForm!: FormGroup;
  isEdit = false;
  public isDarkMode: boolean = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,    private  darkModeService: DarkModeService

  ) {}

  ngOnInit() {
    this.productDemandForm = this.formBuilder.group({
      productId: [this.productDemand?.productId || '', Validators.required],
      name: [this.productDemand?.name || '', Validators.required],
      description: [this.productDemand?.description || ''],
      price: [this.productDemand?.price || null, Validators.required],
      weight: [this.productDemand?.weight || null, Validators.required],
      status: [this.productDemand?.status || 'Available', Validators.required],
      createdAt: [new Date(), Validators.required], // Ensure this is set

    });

    if (this.productDemand?.productId) {
      this.isEdit = true;
    }


    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  saveProductDemand() {
    if (this.productDemandForm.valid) {
      this.modalController.dismiss(this.productDemandForm.value);
    }
  }
}
