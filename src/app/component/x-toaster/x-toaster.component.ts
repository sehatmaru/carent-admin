import { CommonModule } from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
} from '@angular/core'

import {
  ButtonDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastCloseDirective,
  ToastComponent,
  ToasterService,
  ToastHeaderComponent,
  ToastModule,
} from '@coreui/angular'
import { cilUser, cilLockLocked, cilTouchApp } from '@coreui/icons'
import { IconModule } from '@coreui/icons-angular'
import { ToastType } from 'src/app/enum/toast-type.enum'

@Component({
  selector: 'app-x-toaster',
  templateUrl: './x-toaster.component.html',
  styleUrls: ['./x-toaster.component.scss'],
  providers: [
    {
      provide: ToastComponent,
      useExisting: forwardRef(() => XToasterComponent),
    },
  ],
  standalone: true,
  imports: [
    ToastHeaderComponent,
    ToastBodyComponent,
    ToastCloseDirective,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    IconModule,
    ToastModule,
    ButtonDirective,
    CommonModule,
  ],
})
export class XToasterComponent extends ToastComponent {
  @Input() type!: ToastType
  @Input() title = ''
  @Input() message = ''

  percentage = 0

  public icons = { cilUser, cilLockLocked, cilTouchApp }

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef)
  }

  onVisibleChange($event: boolean) {
    this.visible = $event
    this.percentage = !this.visible ? 0 : this.percentage
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25
  }

  isSuccess() {
    return this.type === ToastType.SUCCESS
  }

  isError() {
    return this.type === ToastType.ERROR
  }
}
