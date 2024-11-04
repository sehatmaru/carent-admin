import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { NgScrollbar } from 'ngx-scrollbar'

import { IconDirective } from '@coreui/icons-angular'
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
} from '@coreui/angular'

import { DefaultFooterComponent, DefaultHeaderComponent } from './'
import {
  navItems,
  adminNavItems,
  tenantManagerNavItems,
  tenantAdminNavItems,
} from './_nav'
import { StorageService } from 'src/app/service/storage.service'

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
  ],
})
export class DefaultLayoutComponent {
  public navItems = navItems

  constructor(private storageService: StorageService) {
    this.navItems = this.storageService.isAdmin()
      ? adminNavItems
      : this.storageService.isTenantManager()
      ? tenantManagerNavItems
      : tenantAdminNavItems
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
