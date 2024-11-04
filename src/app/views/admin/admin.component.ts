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
} from '@coreui/angular'
import { cilAddressBook, cilUser } from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { XSpinnerComponent } from 'src/app/component/x-spinner/x-spinner.component'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { AdminResponse } from 'src/app/model/admin-model'
import { CustomerFilterRequest } from 'src/app/model/admin-model'
import { ManagerService } from 'src/app/service/tenant/manager.service'
import { Utils } from 'src/app/utils/utils'

@Component({
  selector: 'app-admin',
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
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  public icons = { cilAddressBook, cilUser }

  public loadings = { admin: false }

  public adminFilter = new CustomerFilterRequest()

  public adminList: AdminResponse[] = []

  constructor(private managerService: ManagerService, private utils: Utils) {}

  ngOnInit(): void {
    this.doGetAdminList()
  }

  doGetAdminList() {
    this.loadings.admin = true

    this.managerService.getAdminList(this.adminFilter).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.adminList = resp.result
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
}
