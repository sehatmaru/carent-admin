import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, CardModule, FormModule, ColDirective, ButtonDirective, TableDirective, AvatarModule, SpinnerModule, BadgeModule } from '@coreui/angular';
import { cilAddressBook, cilUser, cilDescription, cilCog, cilOptions, cilSearch } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { XSpinnerComponent } from 'src/app/component/x-spinner/x-spinner.component';
import { EngineType } from 'src/app/enum/engine-type.enum';
import { OrderStatus } from 'src/app/enum/order-status.enum';
import { PaymentStatus } from 'src/app/enum/payment-status.enum';
import { PaymentType } from 'src/app/enum/payment-type.enum';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { Transmission } from 'src/app/enum/transmission.enum';
import { BillingFilterRequestModel, BillingListResponseModel } from 'src/app/model/billing-model';
import { BillingService } from 'src/app/service/tenant/billing.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [XSpinnerComponent, RowComponent, ColComponent, CardModule, CommonModule, FormModule, FormsModule, IconDirective, ColDirective, ReactiveFormsModule, ButtonDirective, TableDirective, AvatarModule, SpinnerModule, BadgeModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {

  public icons = { cilAddressBook, cilUser, cilDescription, cilCog, cilOptions, cilSearch };

  public loadings = { billing: false }

  public billingFilter = new BillingFilterRequestModel()

  public billingList: BillingListResponseModel[] = []

  public paymentTypeEnumList = Object.values(PaymentType).filter(value => typeof value === 'string')
  public paymentStatusEnumList = Object.values(PaymentStatus).filter(value => typeof value === 'string')
  public orderStatusEnumList = Object.values(OrderStatus).filter(value => typeof value === 'string')

  constructor(
    private billingService: BillingService,
    private utils: Utils
  ) {
    
  }

  ngOnInit(): void {
    this.doGetBillingList()
  }

  doGetBillingList() {
    this.loadings.billing = true
  
    this.billingService.getBillingList(this.billingFilter).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.billingList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.billing = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.billing = false
      }
    });
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
    } else if (value === PaymentStatus[PaymentStatus.CANCELED] || value === PaymentStatus[PaymentStatus.FAILED]) {
        return 'danger'
    } else if (value === PaymentStatus[PaymentStatus.REFUNDED] || value === PaymentStatus[PaymentStatus.PARTIALLY_PAID]) {
        return 'warning'
    }

    return 'secondary'
  }
  
}
