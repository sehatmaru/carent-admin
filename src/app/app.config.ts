import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router'

import { DropdownModule, SidebarModule } from '@coreui/angular'
import { IconSetService } from '@coreui/icons-angular'
import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { CommonModule, registerLocaleData } from '@angular/common'
import { CommonInterceptor } from './interceptor/common.interceptor'
import localeId from '@angular/common/locales/id'

registerLocaleData(localeId, 'id')

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule, CommonModule),
    IconSetService,
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([CommonInterceptor])),
    { provide: LOCALE_ID, useValue: 'id' },
  ],
}
