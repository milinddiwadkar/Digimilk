import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DarkModeService } from '../../services/dark-mode';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {
  public isDarkMode: boolean = false;
  showContent: { [key: string]: boolean } = {
    faq: false,
    contactSupport: false,
    userGuides: false,
    troubleshooting: false,
    reportProblem: false,
  };

  private content: { [key: string]: SafeHtml } = {};

  constructor(private sanitizer: DomSanitizer,private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });

  }

  goBack() {
    // Implement navigation logic here
  }

  toggleContent(section: string) {
    // Toggle the visibility of the section
    this.showContent[section] = !this.showContent[section];
    // Set content if it hasn't been set already
    if (!this.content[section]) {
      this.content[section] = this.getContent(section);
    }
  }

  getContent(section: string): SafeHtml {
    switch (section) {
      case 'faq':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <h2>Frequently Asked Questions</h2>
          <ul>
            <li><strong>What is DigiMilk?</strong> DigiMilk is a platform for managing dairy products.</li>
            <li><strong>How do I reset my password?</strong> Go to settings and choose "Change Password".</li>
            <li><strong>How can I contact support?</strong> Use the "Contact Support" option above.</li>
          </ul>`);
      case 'contactSupport':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <h2>Contact Support</h2>
          <p>You can contact support via email or phone:</p>
          <p><strong>Email:</strong> support@digimilk.com</p>
          <p><strong>Phone:</strong> +1-800-555-1234</p>`);
      case 'userGuides':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <h2>User Guides</h2>
          <ul>
            <li><strong>Getting Started:</strong> Learn how to set up your account and navigate the app.</li>
            <li><strong>Managing Products:</strong> Detailed guide on adding, editing, and deleting products.</li>
            <li><strong>Admin Features:</strong> Overview of administrative tools and settings.</li>
          </ul>`);
      case 'troubleshooting':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <h2>Troubleshooting Tips</h2>
          <ul>
            <li><strong>App Crashes:</strong> Ensure you have the latest version of the app and restart it.</li>
            <li><strong>Login Issues:</strong> Check your internet connection and verify your credentials.</li>
            <li><strong>Feature Not Working:</strong> Contact support if a feature is not functioning as expected.</li>
          </ul>`);
      case 'reportProblem':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <h2>Report a Problem</h2>
          <p>Your issue has been reported. We will get back to you shortly.</p>
          <p><strong>Issue Description:</strong></p>
          <textarea rows="4" placeholder="Describe your issue here..." style="width: 100%;"></textarea>`);
      default:
        return this.sanitizer.bypassSecurityTrustHtml('');
    }
  }
}
