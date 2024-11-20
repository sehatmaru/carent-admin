import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
  RowComponent,
  ColComponent,
  CardModule,
  FormModule,
  TableDirective,
  SpinnerModule,
  BadgeModule,
  ButtonDirective,
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
import { XPaginationComponent } from 'src/app/component/x-pagination/x-pagination.component'

import { OrderStatus } from 'src/app/enum/order-status.enum'
import { PaymentStatus } from 'src/app/enum/payment-status.enum'
import { PaymentType } from 'src/app/enum/payment-type.enum'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { BillingFilterRequestModel } from 'src/app/model/billing-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import { BillingService } from 'src/app/service/tenant/billing.service'
import { Utils } from 'src/app/utils/utils'

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    XPaginationComponent,
    RowComponent,
    ColComponent,
    CardModule,
    CommonModule,
    FormModule,
    FormsModule,
    IconDirective,
    TableDirective,
    SpinnerModule,
    BadgeModule,
    ButtonDirective,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  private billingService = inject(BillingService)
  private utils = inject(Utils)

  public icons = {
    cilAddressBook,
    cilUser,
    cilDescription,
    cilCog,
    cilOptions,
    cilSearch,
  }

  public loadings = { billing: false }

  public pagination = new PaginationRequestModel()
  public billingFilter = new BillingFilterRequestModel()

  public dataPagination: any = {}

  public paymentTypeEnumList = Object.values(PaymentType).filter(
    (value) => typeof value === 'string'
  )
  public paymentStatusEnumList = Object.values(PaymentStatus).filter(
    (value) => typeof value === 'string'
  )
  public orderStatusEnumList = Object.values(OrderStatus).filter(
    (value) => typeof value === 'string'
  )

  ngOnInit(): void {
    this.doGetBillingList()
  }

  doGetBillingList() {
    this.loadings.billing = true

    this.billingService
      .getBillingList(this.billingFilter, this.pagination)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.dataPagination = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.billing = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.billing = false
        },
      })
  }

  resetFilter() {
    this.billingFilter = new BillingFilterRequestModel()

    this.doGetBillingList()
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

  getPaymentStatusColor(value: any): string {
    if (value == PaymentStatus[PaymentStatus.PAID]) {
      return 'success'
    } else if (
      value === PaymentStatus[PaymentStatus.CANCELED] ||
      value === PaymentStatus[PaymentStatus.FAILED]
    ) {
      return 'danger'
    } else if (
      value === PaymentStatus[PaymentStatus.REFUNDED] ||
      value === PaymentStatus[PaymentStatus.PARTIALLY_PAID]
    ) {
      return 'warning'
    }

    return 'secondary'
  }

  paginationChange(event: PaginationRequestModel) {
    this.pagination = event
    this.doGetBillingList()
  }
}
