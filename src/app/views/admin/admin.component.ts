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
  cilAddressBook,
  cilChevronDoubleLeft,
  cilChevronDoubleRight,
  cilChevronLeft,
  cilChevronRight,
  cilUser,
} from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { XPaginationComponent } from 'src/app/component/x-pagination/x-pagination.component'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { CustomerFilterRequest } from 'src/app/model/admin-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import { ManagerService } from 'src/app/service/tenant/manager.service'
import { Utils } from 'src/app/utils/utils'

@Component({
  selector: 'app-admin',
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
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  public icons = {
    cilAddressBook,
    cilUser,
    cilChevronDoubleLeft,
    cilChevronLeft,
    cilChevronDoubleRight,
    cilChevronRight,
  }

  public loadings = { admin: false }

  public adminFilter = new CustomerFilterRequest()
  public pagination = new PaginationRequestModel()

  public dataPagination: any = {}

  constructor(private managerService: ManagerService, private utils: Utils) {}

  ngOnInit(): void {
    this.doGetAdminList()
  }

  doGetAdminList() {
    this.loadings.admin = true

    this.managerService
      .getAdminList(this.adminFilter, this.pagination)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.dataPagination = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.admin = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.admin = false
        },
      })
  }

  resetFilter() {
    this.adminFilter = new CustomerFilterRequest()

    this.doGetAdminList()
  }

  paginationChange(event: PaginationRequestModel) {
    this.pagination = event
    this.doGetAdminList()
  }
}
