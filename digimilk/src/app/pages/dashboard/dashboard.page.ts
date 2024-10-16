import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


// Define the type for dropdown states
interface DropdownStates {
  [key: string]: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // dropdowns: DropdownStates = {
  //   users: false,
  //   masters: false,
  //   farmerDemand: false,
  //   reports: false,
  //   broadcastMessage: false,
  // };
  dropdowns: { [key: string]: boolean } = {
    menu1: false,
    menu2: false,
  };

  toggleDropdown(menu: string) {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }


  constructor(private menuController: MenuController) {}

  ngOnInit() {
    // Initialization logic if any
  }

  async openMenu() {
    await this.menuController.open('main-menu');
  }

  async closeMenu() {
    await this.menuController.close('main-menu');
  }

  toggleMenu() {
    this.menuController.isOpen('main-menu').then(isOpen => {
      if (isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });
  }

  // toggleDropdown(section: string) {
  //   // Toggle the visibility of the dropdown
  //   this.dropdowns[section] = !this.dropdowns[section];
  // }

}
