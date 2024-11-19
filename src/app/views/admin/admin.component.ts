import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  RowComponent,
  ColComponent,
  CardModule,
  FormModule,
  ButtonDirective,
  TableDirective,
  AvatarModule,
  SpinnerModule,
  ModalModule,
  PopoverModule,
} from '@coreui/angular'
import { cilAddressBook, cilSearch, cilTrash, cilUser } from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { XPaginationComponent } from 'src/app/component/x-pagination/x-pagination.component'
import { StatusCode } from 'src/app/enum/status-code.enum'
import {
  AdminRegisterRequestModel,
  AdminResponse,
  CustomerFilterRequest,
} from 'src/app/model/admin-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import { ManagerService } from 'src/app/service/tenant/manager.service'
import { Utils } from 'src/app/utils/utils'
import { CreateEditComponent } from './components/create-edit/create-edit.component'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    XPaginationComponent,
    CreateEditComponent,
    RowComponent,
    ColComponent,
    CardModule,
    CommonModule,
    FormModule,
    FormsModule,
    IconDirective,
    ReactiveFormsModule,
    ButtonDirective,
    TableDirective,
    AvatarModule,
    SpinnerModule,
    ModalModule,
    PopoverModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  private managerService = inject(ManagerService)
  private utils = inject(Utils)

  public icons = {
    cilAddressBook,
    cilUser,
    cilSearch,
    cilTrash,
  }

  public loadings = { admin: false, adminRegister: false, adminDeleting: false }

  public adminFilter = new CustomerFilterRequest()
  public pagination = new PaginationRequestModel()
  public addEditRequestModel = new AdminRegisterRequestModel()

  public dataPagination: any = {}
  public isAddEditModalVisible = false

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

  doRegisterAdmin() {
    this.loadings.adminRegister = true

    this.managerService.registerAdmin(this.addEditRequestModel).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetAdminList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.adminRegister = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.adminRegister = false
      },
    })
  }

  doUpdateAdmin() {
    this.loadings.adminRegister = true

    this.managerService.updateAdmin(this.addEditRequestModel).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetAdminList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.adminRegister = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.adminRegister = false
      },
    })
  }

  doDeleteAdmin() {
    this.loadings.adminDeleting = true

    this.managerService.deleteAdmin(this.addEditRequestModel.id!!).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetAdminList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.adminDeleting = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.adminDeleting = false
      },
    })
  }

  filter() {
    this.pagination.reset()
    this.doGetAdminList()
  }

  resetFilter() {
    this.adminFilter = new CustomerFilterRequest()

    this.doGetAdminList()
  }

  paginationChange(event: PaginationRequestModel) {
    this.pagination = event
    this.doGetAdminList()
  }

  requestChange(event: AdminRegisterRequestModel) {
    this.addEditRequestModel = event
  }

  toogleAddEditModal() {
    this.isAddEditModalVisible = !this.isAddEditModalVisible
  }

  selectAdmin(data: AdminResponse) {
    this.addEditRequestModel.id = data.id
    this.addEditRequestModel.fullName = data.name
    this.addEditRequestModel.username = data.username
    this.addEditRequestModel.email = data.email
    // this.addEditRequestModel.password = data.password
    this.addEditRequestModel.mobile = data.mobile

    this.isAddEditModalVisible = true
  }

  addEditModalVisibleChange(event: boolean) {
    this.isAddEditModalVisible = event

    if (!event) {
      this.addEditRequestModel.reset()
    }
  }

  saveAdmin() {
    if (this.addEditRequestModel.id) {
      this.doUpdateAdmin()
    } else {
      this.doRegisterAdmin()
    }
  }
}
