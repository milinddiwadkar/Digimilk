import { Component, ElementRef} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from '../../services/title.service'; // Adjust path as needed
import { DarkModeService } from '../../services/dark-mode';
import { Platform, AlertController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  searchQuery: string = '';
  notifications: number = 5; // Example value
  isUserMenuOpen: boolean = false;
  popoverEvent: any; // Store the event to position the popover correctly
  Title: string = 'Dashboard';
  isDarkMode: boolean = false;
  isSmallScreen: boolean = false;
  isSearchActive: boolean = false;
  searchResults: Array<{ name: string, route: string,icon: string, isAction?: boolean }> = [];

  adminName: string = ''; // Replace with actual name
  //adminPhotoUrl: string = 'assets/first-section/person.svg'; // Replace with actual photo URL

  items: Array<{ name: string, route: string, icon: string, isAction?: boolean }> = [
    { name: 'My Account', route: '/profile', icon: 'person-outline'  },
    { name: 'Settings', route: '/settings', icon: 'settings-outline'  },
    { name: 'Help', route: '/help' , icon: 'help-circle-outline' },
    { name: 'Logout', route: 'logout',icon: 'log-out-outline' , isAction: true }
  ];


  constructor(
    private router: Router,
    private titleService: TitleService,
    public darkModeService: DarkModeService,
    private platform: Platform,
    private alertController: AlertController, private elementRef: ElementRef // Inject ElementRef to access the host element

  ) {
    this.darkModeService.initializeDarkMode(); // Initialize dark mode based on saved preferences
  }

  ngOnInit() {
    this.subscribeToTitleChanges();
    this.handleScreenResize();
    this.subscribeToDarkModeChanges();

    // Example check for small screens
    this.isSmallScreen = window.innerWidth < 768; // Adjust as needed
    window.addEventListener('resize', () => {
      this.isSmallScreen = window.innerWidth < 768;
    });

    // Subscribe to NavigationEnd to close the user menu
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeUserMenu(); // Close the user menu when navigation ends
      }
    });
  }
  

  subscribeToTitleChanges() {
    this.titleService.title$.pipe(
      catchError(error => {
        console.error('Error fetching title:', error);
        return of('Default Title'); // Fallback title
      })
    ).subscribe(title => {
      this.Title = title;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitleFromRoute(event.urlAfterRedirects);
        if (title) {
          this.titleService.setTitle(title);
        }
      }
    });
  }

  getTitleFromRoute(url: string): string {
    const titles: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/wordpress-store': 'WordPress Store',
      '/roles-permissions': 'Roles & Permissions',
      '/user': 'User',
      '/milk-types': 'Milk Type',
      '/masters/pro-type': 'Product Type',
      '/product': 'Product',
      '/masters/shift': 'Shift',
      '/masters/rate-chart': 'Rate Chart',
      '/masters/farmer-loan-detail': 'Farmer Loan Details',
      '/masters/farmer-rd-details': 'Farmer RD Details',
      '/masters/route-master': 'Route Master',
      '/masters/set-min-snf-fat': 'Set MIN SNF-FAT',
      '/masters/settle-pay': 'Settle Payment',
      '/masters/manage-week': 'Manage Week',
      '/milk-collection': 'Milk Collection',
      '/queries': 'Queries',
      '/society-milk-collection': 'Society Milk Collection',
      '/farmer-demand/pro-demand': 'Product Demand',
      '/farmer-demand/dr-demand': 'Dr. Demand',
      '/payments': 'Payments',
      '/products': 'Products',
      '/society-sales': 'Society Sales',
      '/reports/union': 'Union',
      '/reports/supervisor-master': 'Supervisor Master',
      '/reports/society-samiti': 'Society-Samiti',
      '/reports/demands': 'Demands',
      '/reports/society-sales': 'Society Sales',
      '/reports/society-milk-coll': 'Society Milk Collection',
      '/reports/queries': 'Queries',
      '/reports/qual-quan-check': 'Qual-Quan Check',
      '/reports/products': 'Products',
      '/reports/payments': 'Payments',
      '/reports/milk-coll': 'Milk Collection',
      '/reports/farmers': 'Farmers',
      '/society-demands': 'Society Demands',
      '/broadcast-message/screen-msg': 'Screen Message',
      '/broadcast-message/farmer-screen-msg': 'Farmer Screen Message',
      '/settings': 'Settings',
      '/profile': 'My Account',
      '/help': 'Help Center',
      // Add more routes as needed
    };
    return titles[url] || 'DigiMilk'; // Default title
  }


  // screen size
  handleScreenResize() {
    this.checkScreenSize();
    this.platform.resize.subscribe(() => {
      this.checkScreenSize();
    });
  }

  checkScreenSize() {
    this.isSmallScreen = this.platform.width() < 768; // Adjust the width as needed
  }

  // search bar
  toggleSearchBar() {
    this.isSearchActive = !this.isSearchActive;
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.searchResults = this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  clearSearch() {
    this.searchResults = [];
    this.searchQuery = '';
    this.isSearchActive = false;
  }

  selectSearchResult(item: { name: string, route: string, isAction?: boolean }) {
    this.navigateTo(item);
  }

  navigateTo(item: { name: string, route: string, isAction?: boolean }) {
    if (item.isAction) {
      if (item.route === 'logout') {
        this.logout();
      }
      // Handle other actions if needed
    } else {
      this.router.navigate([item.route]);
      this.clearSearch();
    }
  }

  async logout() {
    console.log('Logout triggered');

    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Logout canceled');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.clearSearch(); // Clear search on logout
            this.performLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  performLogout() {
    console.log('Logged out');
    this.router.navigate(['/login']);
  }

  
  trackByFn(index: number, item: any): string {
    return item.route; // Unique identifier for *ngFor
  }

  toggleUserMenu(event: any) {
    this.popoverEvent = event; // Capture the event
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }
  
  // for notification
  clearNotifications() {
    this.notifications = 0;
  }

  // dark mode

  subscribeToDarkModeChanges() {
    this.isDarkMode = this.darkModeService.isDarkModeEnabled();
    this.darkModeService.darkMode$.pipe(
      catchError(error => {
        console.error('Error fetching dark mode status:', error);
        return of(false); // Default to light mode
      })
    ).subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
      this.applyDarkMode(isDarkMode);
    });
  }

  applyDarkMode(isDarkMode: boolean) {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }

  navigateto(route: string) {
    this.router.navigate([route]);
    this.clearSearch();
  }
  
}
