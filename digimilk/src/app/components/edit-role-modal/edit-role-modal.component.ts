import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DarkModeService } from '../../services/dark-mode';

interface Page {
  name: string;
  selected: boolean;
  subPages?: Page[];
}

@Component({
  selector: 'app-edit-role-modal',
  templateUrl: './edit-role-modal.component.html',
  styleUrls: ['./edit-role-modal.component.scss'],
})  
export class EditRoleModalComponent implements OnInit {
  @Input() role: any;
  roleForm: FormGroup;
  isEditMode:boolean=false;
  public isDarkMode: boolean = false;

  allPages: Page[] = [  // Use the Page interface here
    { name: 'Roles & Permissions', selected: false },
    { name: 'User', selected: false, subPages: [
      { name: 'Add Users', selected: false },
      { name: 'Users', selected: false }
    ]},
    { name: 'Masters', selected: false, subPages: [
      { name: 'Milk Type', selected: false },
      { name: 'Product Type', selected: false },
      { name: 'Product', selected: false },
      { name: 'Shift', selected: false },
      { name: 'Rate-Chart', selected: false },
      { name: 'Farmer Loan Details', selected: false },
      { name: 'Farmers RD Details', selected: false },
      { name: 'Route Master', selected: false },
      { name: 'Set Min SNF FAT', selected: false },
      { name: 'Settle Payments', selected: false },
      { name: 'Manage Week', selected: false },
    ]},
    { name: 'Milk Collection', selected: false },
    { name: 'Queries', selected: false },
    { name: 'Society Milk Collection', selected: false },
    { name: 'Farmer Demand', selected: false,  subPages: [
      { name: 'Product Demand', selected: false },
      { name: 'Doctors Demand', selected: false }
    ]},
    { name: 'Payments', selected: false },
    { name: 'Product', selected: false },
    { name: 'Society Sales', selected: false },
    { name: 'Reports', selected: false, subPages: [
      { name: 'Union', selected: false },
      { name: 'Supervisor Master', selected: false },
      { name: 'Society(Samiti)', selected: false },
      { name: 'Farmers', selected: false },
      { name: 'Milk Collection', selected: false },
      { name: 'Queries', selected: false },
      { name: 'Demands', selected: false },
      { name: 'Payments', selected: false },
      { name: 'Products', selected: false },
      { name: 'Society Milk Collection', selected: false },
      { name: 'Quan/Qual Check', selected: false },
      { name: 'Society Sales', selected: false },
    ]},
    { name: 'Society Demands', selected: false },
    { name: 'Broadcast message', selected: false, subPages: [
      { name: 'Screen Message', selected: false },
      { name: 'Farmer Screen Message', selected: false },
    ]},
    { name: 'Settings', selected: false },
  ];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,    private  darkModeService: DarkModeService

  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
    });
  }

  ngOnInit() {
    // console.log('Modal Initialized', this.role);
    if (this.role) {
      this.isEditMode = true;
      this.roleForm.patchValue({
        name: this.role.name,
        status: this.role.status,
      });

      // Initialize selected pages
      this.initializeSelectedPages(this.role.pages);
    }

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  togglePageSelection(pageIndex: number) {
    const page = this.allPages[pageIndex];
    page.selected = !page.selected;

    if (page.subPages) {
      page.subPages.forEach(subPage => subPage.selected = page.selected);
    }
  }

  toggleSubPageSelection(pageIndex: number, subPageIndex: number) {
    const page = this.allPages[pageIndex];
    
    // Check if subPages exists and the subPageIndex is valid
    if (page.subPages && page.subPages[subPageIndex]) {
      const subPage = page.subPages[subPageIndex];
      subPage.selected = !subPage.selected;
  
      // Optionally, set the parent page to selected if any subpage is selected
      if (subPage.selected) {
        page.selected = true;
      }
    }
  }
  

  onSubmit() {
    if (this.roleForm.valid) {
      const formData = this.roleForm.value;
      const selectedPages = this.allPages
        .filter(page => page.selected || (page.subPages && page.subPages.some(subPage => subPage.selected)));
      
      this.modalCtrl.dismiss({
        ...formData,
        pages: selectedPages,
      });
    } else {
      console.log('Form is not valid');
    }
  }
  
  initializeSelectedPages(selectedPages: any[]) {
    this.allPages.forEach(page => {
      if (selectedPages.some(sp => sp.name === page.name)) {
        page.selected = true;
      }
      if (page.subPages) {
        page.subPages.forEach(subPage => {
          if (selectedPages.some(sp => sp.name === subPage.name)) {
            subPage.selected = true;
          }
        });
      }
    });
  }
}
