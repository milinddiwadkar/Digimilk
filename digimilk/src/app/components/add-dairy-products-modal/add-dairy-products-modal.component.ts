import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-dairy-products-modal',
  templateUrl: './add-dairy-products-modal.component.html',
  styleUrls: ['./add-dairy-products-modal.component.scss'],
})
export class AddDairyProductsModalComponent implements OnInit {
  @Input() product: any;
  productForm!: FormGroup;
  isEdit: boolean = false;
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  public isDarkMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,    private  darkModeService: DarkModeService

  ) {}

  ngOnInit() {
    this.isEdit = !!this.product;
    this.productForm = this.fb.group({
      id: [this.product?.id || null],
      name: [this.product?.name || '', Validators.required],
      type: [this.product?.type || '', Validators.required],
      price: [this.product?.price || '', [Validators.required, Validators.min(0)]],
      status: [this.product?.status || '', Validators.required],
    });

    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        type: this.product.type,
        price: this.product.price,
        status: this.product.status,
      });

      this.previewImage = this.product.image;
    }


    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      const formValue = this.productForm.value;
      formData.append('id', formValue.id || ''); // Handle ID
      formData.append('name', formValue.name);
      formData.append('type', formValue.type);
      formData.append('price', formValue.price);
      formData.append('status', formValue.status);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else if (this.previewImage && typeof this.previewImage === 'string') {
        // Use existing image URL if no new file selected
        formData.append('image', this.previewImage);
      }

      await this.modalController.dismiss({
        ...formValue,
        image: this.selectedFile || this.previewImage // Ensure correct image data is returned
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
