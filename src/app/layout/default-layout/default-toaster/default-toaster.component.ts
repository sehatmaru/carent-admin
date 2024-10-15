import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';

import {
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastCloseDirective,
  ToastComponent,
  ToasterService,
  ToastHeaderComponent
} from '@coreui/angular';

@Component({
  selector: 'app-deafult-toaster',
  templateUrl: './default-toaster.component.html',
  styleUrls: ['./default-toaster.component.scss'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => DefaultToasterComponent) }],
  standalone: true,
  imports: [ToastHeaderComponent, ToastBodyComponent, ToastCloseDirective, ProgressBarDirective, ProgressComponent, ProgressBarComponent]
})
export class DefaultToasterComponent extends ToastComponent {

  @Input() closeButton = true;
  @Input() title = '';

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }
}