import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
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
} from '@coreui/angular'
import { cilUser, cilAddressBook } from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { XPaginationComponent } from 'src/app/component/x-pagination/x-pagination.component'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { CustomerFilterRequest } from 'src/app/model/customer-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import { ManagerService } from 'src/app/service/tenant/manager.service'
import { Utils } from 'src/app/utils/utils'

@Component({
  selector: 'app-customer',
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
    ColDirective,
    ReactiveFormsModule,
    ButtonDirective,
    TableDirective,
    AvatarModule,
    SpinnerModule,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  private managerService = inject(ManagerService)
  private utils = inject(Utils)

  public icons = {
    cilAddressBook,
    cilUser,
  }

  public loadings = { customer: false }

  public customerFilter = new CustomerFilterRequest()
  public pagination = new PaginationRequestModel()

  public dataPagination: any = {}

  ngOnInit(): void {
    this.doGetCustomerList()
  }

  doGetCustomerList() {
    this.loadings.customer = true

    this.managerService
      .getCustomerList(this.customerFilter, this.pagination)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.dataPagination = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.customer = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.customer = false
        },
      })
  }

  resetFilter() {
    this.customerFilter = new CustomerFilterRequest()

    this.doGetCustomerList()
  }

  paginationChange(event: PaginationRequestModel) {
    this.pagination = event
    this.doGetCustomerList()
  }
}
