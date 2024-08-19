import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent  implements OnInit {

  dropdowns: { [key: string]: boolean } = {
    users: false,
    reports: false,
    masters: false,
    farmerDemand: false,
    broadcastMessage: false
  };

  showMenuBar = true;


  constructor(private menu: MenuController, private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenuBar = !event.url.includes('/login');
      }
    });
  
  }
  ngOnInit() {}

  toggleDropdown(key: string) {
    this.dropdowns[key] = !this.dropdowns[key];
  }

  closeMenu() {
    this.menu.close('main-menu');
  }

}
