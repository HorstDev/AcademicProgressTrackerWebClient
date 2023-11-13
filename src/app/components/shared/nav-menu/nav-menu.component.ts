import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isNavMenuCollapsed: boolean = true;

  constructor(public _authService: AuthService) {}

  get navMenuCssClass() : string {
    return this.isNavMenuCollapsed ? 'collapse' : ''
  }

  toggleMenu() {
    this.isNavMenuCollapsed = !this.isNavMenuCollapsed;
  }
}
