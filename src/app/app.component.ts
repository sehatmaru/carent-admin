import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';

import { ColorModeService, ToasterComponent } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Utils } from './utils/utils';

@Component({
  selector: 'app-root',
  template: `
    <c-toaster #toaster position="fixed" class="p-3" [placement]="'top-end'"></c-toaster>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet, ToasterComponent]
})
export class AppComponent implements OnInit {
  title = 'Carent';

  @ViewChild('toaster') toaster!: ToasterComponent;

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor(
    private utils: Utils
  ) {
    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {

    this.#router.events.pipe(
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  ngAfterViewInit() {
    // Pass the toaster reference to the Utils service
    this.utils.setToaster(this.toaster);
  }
}
