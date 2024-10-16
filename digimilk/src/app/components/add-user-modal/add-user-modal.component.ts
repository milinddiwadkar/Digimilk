import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  @Input() user: any;  // This will contain the user data passed in for editing
  isEdit:boolean=false;
  public isDarkMode: boolean = false;

  form!: FormGroup;
  roles = ['Union', 'Supervisor', 'Society', 'Farmer'];

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,    private  darkModeService: DarkModeService
  ) {}

  ngOnInit() {
      this.isEdit = !!this.user;
    this.form = this.fb.group({
      userName: [this.user?.userName || '', Validators.required],
      emailId: [this.user?.emailId || '', [Validators.required, Validators.email]],
      userId: [this.user?.userId || '', Validators.required],
      mobile: [this.user?.mobile || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: [this.user?.role || '', Validators.required],
      status: [this.user?.status || 'Active', Validators.required],
      createdAt: [this.user?.createdAt || new Date(), Validators.required],
    });

    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    } else {
      // Handle validation errors if needed
    }
  }
}
