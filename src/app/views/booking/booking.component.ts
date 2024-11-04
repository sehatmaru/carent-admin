import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  RowComponent,
  ColComponent,
  CardModule,
  FormModule,
  ColDirective,
  ButtonDirective,
  TableDirective,
  AvatarModule,
  SpinnerModule,
  BadgeModule,
} from '@coreui/angular'
import {
  cilAddressBook,
  cilUser,
  cilDescription,
  cilCog,
  cilOptions,
  cilSearch,
} from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { XSpinnerComponent } from 'src/app/component/x-spinner/x-spinner.component'
import { BookingService } from 'src/app/service/tenant/booking.service'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { Utils } from 'src/app/utils/utils'
import {
  BookingFilterRequestModel,
  BookingListResponseModel,
} from 'src/app/model/booking-model'
import { PickupType } from 'src/app/enum/pickup-type.enum'
import { OrderStatus } from 'src/app/enum/order-status.enum'

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    XSpinnerComponent,
    RowComponent,
    ColComponent,
    CardModule,
    CommonModule,
    FormModule,
    FormsModule,
    IconDirective,
    ColDirective,
    ReactiveFormsModule,
    ButtonDirective,
    TableDirective,
    AvatarModule,
    SpinnerModule,
    BadgeModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  public icons = {
    cilAddressBook,
    cilUser,
    cilDescription,
    cilCog,
    cilOptions,
    cilSearch,
  }

  public loadings = { booking: false }

  public bookingFilter = new BookingFilterRequestModel()

  public bookingList: BookingListResponseModel[] = []

  public pickupTypeEnumList = Object.values(PickupType).filter(
    (value) => typeof value === 'string'
  )

  constructor(private bookingService: BookingService, private utils: Utils) {}

  ngOnInit(): void {
    this.doGetBookingList()
  }

  doGetBookingList() {
    this.loadings.booking = true

    this.bookingService.getBookingList(this.bookingFilter).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.bookingList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.booking = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.booking = false
      },
    })
  }

  resetFilter() {
    this.bookingFilter = new BookingFilterRequestModel()

    this.doGetBookingList()
  }

  getOrderStatusColor(value: any): string {
    if (value == OrderStatus[OrderStatus.COMPLETED]) {
      return 'success'
    } else if (value === OrderStatus[OrderStatus.CANCELED]) {
      return 'danger'
    } else if (value === OrderStatus[OrderStatus.WAITING_APPROVAL]) {
      return 'warning'
    } else if (value === OrderStatus[OrderStatus.IN_PROGRESS]) {
      return 'info'
    }

    return 'secondary'
  }
}
