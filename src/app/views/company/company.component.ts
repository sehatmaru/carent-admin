import { CommonModule, DatePipe } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  RowComponent,
  ColComponent,
  CardModule,
  FormModule,
  SpinnerModule,
  ModalModule,
  ButtonModule,
} from '@coreui/angular'
import { cilStar, cilStarHalf } from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { Utils } from 'src/app/utils/utils'
import { CreateEditComponent } from './components/create-edit/create-edit.component'
import { ManagerService } from 'src/app/service/tenant/manager.service'
import {
  CompanyResponseModel,
  CompanyUpdateRequestModel,
} from 'src/app/model/company-model'

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardModule,
    CommonModule,
    FormModule,
    FormsModule,
    IconDirective,
    ReactiveFormsModule,
    SpinnerModule,
    CreateEditComponent,
    ModalModule,
    ButtonModule,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  providers: [DatePipe],
})
export class CompanyComponent implements OnInit {
  private managerService = inject(ManagerService)
  private datePipe = inject(DatePipe)
  private utils = inject(Utils)

  public icons = {
    cilStar,
    cilStarHalf,
  }

  public loadings = {
    company: false,
    companyUpdate: false,
  }

  public addEditRequestModel = new CompanyUpdateRequestModel()
  public companyModel = new CompanyResponseModel()

  public isAddEditModalVisible = false

  ngOnInit(): void {
    this.doGetCompanyDetail()
  }

  doGetCompanyDetail() {
    this.loadings.company = true

    this.managerService.getCompanyDetail().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.companyModel = resp.result
          this.companyModel.foundingDateFormatted = this.convertDate(
            this.companyModel.foundingDate
          )
          this.companyModel.joinDateFormatted = this.convertDate(
            this.companyModel.joinDate
          )
          this.companyModel.rating = 2
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.company = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.company = false
      },
    })
  }

  doUpdateProduct() {
    this.loadings.companyUpdate = true

    this.managerService.updateCompany(this.addEditRequestModel).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetCompanyDetail()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.companyUpdate = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.companyUpdate = false
      },
    })
  }

  requestChange(event: CompanyUpdateRequestModel) {
    this.addEditRequestModel = event
  }

  toogleAddEditModal() {
    this.isAddEditModalVisible = !this.isAddEditModalVisible
  }

  selectProduct(data: CompanyUpdateRequestModel) {
    this.addEditRequestModel.id = data.id
    this.addEditRequestModel.firmName = data.firmName
    this.addEditRequestModel.aliasName = data.aliasName
    this.addEditRequestModel.address = data.address
    this.addEditRequestModel.mobile = data.mobile

    this.isAddEditModalVisible = true
  }

  addEditModalVisibleChange(event: boolean) {
    this.isAddEditModalVisible = event

    if (!event) {
      this.addEditRequestModel.reset()
    }
  }

  isInteger(value: number): boolean {
    return Number.isInteger(value)
  }

  getStars(rating: number): number[] {
    const validRating = Math.max(0, Math.floor(rating))
    return Array(validRating).fill(0)
  }

  convertDate(value: Date): string {
    return this.datePipe.transform(value, 'dd/MM/yyyy') || ''
  }

  openUpdateModal() {
    this.addEditRequestModel.id = this.companyModel.id
    this.addEditRequestModel.firmName = this.companyModel.firmName
    this.addEditRequestModel.aliasName = this.companyModel.aliasName
    this.addEditRequestModel.address = this.companyModel.address
    this.addEditRequestModel.mobile = this.companyModel.mobile

    this.isAddEditModalVisible = true
  }
}
