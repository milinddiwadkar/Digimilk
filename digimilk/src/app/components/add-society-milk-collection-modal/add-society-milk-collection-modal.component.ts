import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-society-milk-collection-modal',
  templateUrl: './add-society-milk-collection-modal.component.html',
  styleUrls: ['./add-society-milk-collection-modal.component.scss'],
})
export class AddSocietyMilkCollectionModalComponent {
  @Input() milkCollection: any;
  isEdit:boolean=false;
  public isDarkMode: boolean = false;

  addSocietyMilkCollectionForm: FormGroup;
  societyNames = ['Society A', 'Society B']; // Replace with actual options
  milkTypes = ['Cow Milk', 'Buffalo Milk']; // Replace with actual options
  milkCategories = ['Category 1', 'Category 2']; // Replace with actual options
  shifts = ['Morning', 'Evening']; // Replace with actual options

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,    private  darkModeService: DarkModeService

  ) {
    this.addSocietyMilkCollectionForm = this.fb.group({
      societyName: ['', Validators.required],
      milkType: ['', Validators.required],
      milkCategory: ['', Validators.required],
      shift: ['', Validators.required],
      snf: ['', Validators.required],
      fat: ['', Validators.required],
      ratePerLitre: ['', Validators.required],
      totalMilk: ['', Validators.required],
      totalAmount: ['', Validators.required],
      canId: [''],
      createdAt: [new Date(), Validators.required], // Ensure this is set
    });    
  }
  ngOnInit() {
    this.isEdit = !!this.milkCollection;

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  onSubmit() {
    if (this.addSocietyMilkCollectionForm.valid) {
      // Ensure createdAt is included in the submitted data
      this.modalCtrl.dismiss({
        ...this.addSocietyMilkCollectionForm.value,
        createdAt: new Date() // Ensure createdAt is set
      });
    }
  }
  }
