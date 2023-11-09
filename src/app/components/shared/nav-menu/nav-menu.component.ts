import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isNavMenuCollapsed: boolean = true;

  get navMenuCssClass() : string {
    return this.isNavMenuCollapsed ? 'collapse' : ''
  }

  toggleMenu() {
    this.isNavMenuCollapsed = !this.isNavMenuCollapsed;
  }
}
