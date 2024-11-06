import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
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
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
} from '@coreui/angular'
import {
  cilUser,
  cilAddressBook,
  cilChevronDoubleLeft,
  cilChevronDoubleRight,
  cilChevronLeft,
  cilChevronRight,
} from '@coreui/icons'
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
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    RouterLink,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  public icons = {
    cilAddressBook,
    cilUser,
    cilChevronDoubleLeft,
    cilChevronLeft,
    cilChevronDoubleRight,
    cilChevronRight,
  }

  public loadings = { customer: false }

  public customerFilter = new CustomerFilterRequest()
  public pagination = new PaginationRequestModel()

  public dataPagination: any = {}

  constructor(private managerService: ManagerService, private utils: Utils) {}

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
