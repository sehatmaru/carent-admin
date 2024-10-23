import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarComponent,
  BadgeModule,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { FinanceService } from '../../service/tenant/finance.service'
import { OrderService } from '../../service/tenant/order.service'
import { StatusCode } from 'src/app/enum/status-code.enum';
import { Utils } from 'src/app/utils/utils';
import { BalanceReportResponseModel } from 'src/app/model/finance-model';
import { XSpinnerComponent } from '../../component/x-spinner/x-spinner.component';
import { OrderHistoryResponseModel } from 'src/app/model/order-model';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { PaymentStatus } from 'src/app/enum/payment-status.enum';
import { OrderStatus } from 'src/app/enum/order-status.enum';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [DashboardWidgetComponent, XSpinnerComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent, CommonModule, BadgeModule]
})
export class DashboardComponent implements OnInit {

  private orderService = inject(OrderService)

  public balanceReportData = new BalanceReportResponseModel()
  public orderHistoryListData: OrderHistoryResponseModel[] = []

  public loadings = { balance: false, orderHistory: false}

  constructor(
    private financeService: FinanceService,
    private utils: Utils
  ) {
    
  }

  ngOnInit(): void {
    this.doGetBalanceReport()
    this.doGetDashboardOrderHistoryList()
  }

  doGetBalanceReport() {
    this.loadings.balance = true
  
    this.financeService.getBalanceReport().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.balanceReportData = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.balance = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.balance = false
      }
    });
  }

  doGetDashboardOrderHistoryList() {
    this.loadings.orderHistory = true
  
    this.orderService.getDashboardOrderHistory().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.orderHistoryListData = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.orderHistory = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.orderHistory = false
      }
    });
  }

  public getSvgIcon(value: any): string {
    return value == VehicleType[VehicleType.CAR] ? 'cilCarAlt' : 'cilBike'
  }

  getPaymentStatusColor(value: any): string {
    if (value == PaymentStatus[PaymentStatus.PAID]) {
        return 'success'
    } else if (value === PaymentStatus[PaymentStatus.REFUNDED]
        || value === PaymentStatus[PaymentStatus.FAILED] 
        || value === PaymentStatus[PaymentStatus.CANCELED]) {
        return 'danger'
    } else if (value === PaymentStatus[PaymentStatus.PARTIALLY_PAID]) {
        return 'warning'
    }

    return 'secondary'
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
