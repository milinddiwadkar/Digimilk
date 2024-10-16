import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public showMenuBar = true;
  public isLoginPage = false;
  public searchQuery: string = '';  // Add this line to define searchQuery
  public notifications: number = 3; // Number of notifications

  public dropdowns: Record<string, boolean> = {
    masters: false,
    farmerDemand: false,
    reports: false,
    broadcastMessage: false
  };

  public menuItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'home' },
    { label: 'WordPress Store', link: '/wordpress-store', icon: 'briefcase' },
    { label: 'Roles & Permissions', link: '/roles-permissions', icon: 'apps' },
    { label: 'User', link: '/user', icon: 'pie-chart' },

    // Masters dropdown (placed after User)
    { label: 'Masters', link: '', icon: 'list', isDropdown: true, key: 'masters' },

    { label: 'Milk Collection', link: '/milk-collection', icon: 'briefcase' },


    // Society Milk Collection
    { label: 'Society Milk Collection', link: '/society-milk-collection', icon: 'briefcase' },

    // Farmer Demand dropdown (placed after Society Milk Collection)
    { label: 'Farmer Demand', link: '', icon: 'leaf', isDropdown: true, key: 'farmerDemand' },

    { label: 'Queries', link: '/queries', icon: 'chatbubbles' },
    { label: 'Payments', link: '/payments', icon: 'wallet' },
    { label: 'Product', link: '/products', icon: 'bag-handle' },

    // Society Sales
    { label: 'Society Sales', link: '/society-sales', icon: 'ribbon' },

    // Reports dropdown (placed after Society Sales)
    { label: 'Reports', link: '', icon: 'document', isDropdown: true, key: 'reports' },

    // Society Demands
    { label: 'Society Demands', link: '/society-demands', icon: 'cart' },

    // Broadcast Message dropdown (placed after Society Demands)
    { label: 'Broadcast Message', link: '', icon: 'chatbox-ellipses', isDropdown: true, key: 'broadcastMessage' },

    { label: 'Settings', link: '/settings', icon: 'settings' },

  ];

  public dropdownIcons: Record<string, string> = {
    masters: 'list',
    farmerDemand: 'leaf',
    reports: 'document',
    broadcastMessage: 'chatbox-ellipses'
  };

  public dropdownLabels: Record<string, string> = {
    masters: 'Masters',
    farmerDemand: 'Farmer Demand',
    reports: 'Reports',
    broadcastMessage: 'Broadcast Message'
  };

  public dropdownItems: Record<string, { label: string; link: string }[]> = {
    masters: [
      { label: 'Milk Types', link: '/milk-types' },
      { label: 'Product Type', link: '/masters/pro-type' },
      { label: 'Product', link: '/product' },
      { label: 'Shift', link: '/masters/shift' },
      { label: 'Rate-Chart', link: '/masters/rate-chart' },
      { label: 'Farmer Loan Details', link: '/masters/farmer-loan-detail' },
      { label: 'Farmer RD Details', link: '/masters/farmer-rd-details' },
      { label: 'Router Master', link: '/masters/route-master' },
      { label: 'Set Min SNF FAT', link: '/masters/set-min-snf-fat' },
      { label: 'Settle Payments', link: '/masters/settle-pay' },
      { label: 'Manage Week', link: '/masters/manage-week' }
    ],
    farmerDemand: [
      { label: 'Product Demand', link: '/farmer-demand/pro-demand' },
      { label: 'Doctors Demand', link: '/farmer-demand/dr-demand' }
    ],
    reports: [
      { label: 'Union', link: '/reports/union' },
      { label: 'Supervisor Master', link: '/reports/supervisor-master' },
      { label: 'Society(Samiti)', link: '/reports/society-samiti' },
      { label: 'Farmers', link: '/reports/farmers' },
      { label: 'Milk Collection', link: '/reports/milk-coll' },
      { label: 'Queries', link: '/reports/queries' },
      { label: 'Demands', link: '/reports/demands' },
      { label: 'Payments', link: '/reports/payments' },
      { label: 'Products', link: '/reports/products' },
      { label: 'Society Milk Collection', link: '/reports/society-milk-coll' },
      { label: 'Qual/Quan Check', link: '/reports/qual-quan-check' },
      { label: 'Society Sales', link: '/reports/society-sales' }
    ],
    broadcastMessage: [
      { label: 'Screen Message', link: '/broadcast-message/screen-msg' },
      { label: 'Farmer Screen Message', link: '/broadcast-message/farmer-screen-msg' }
    ]
  };

  // Filtered menu items based on search query
  public filteredMenuItems = this.menuItems;


  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = ['/login', '/forgot-pwd', '/register'].includes(this.router.url);
        this.showMenuBar = !this.isLoginPage;
      }
    });
  }

  closeMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.close();
    }
  }

  toggleDropdown(dropdown: string) {
    if (this.dropdowns.hasOwnProperty(dropdown)) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    }
  }

  navigateTo(link: string) {
    if (link) {
      this.router.navigate([link]);
      this.closeMenu();
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
// for search bar
  performSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredMenuItems = this.menuItems.filter(item =>
      item.label.toLowerCase().includes(query) || 
      (item.isDropdown && this.dropdownItems[item.key]?.some(subItem => subItem.label.toLowerCase().includes(query)))
    );
  }

  // Mock function for notifications
  clearNotifications() {
    this.notifications = 0;
  }

  
}
