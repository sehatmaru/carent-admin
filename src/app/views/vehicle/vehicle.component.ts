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
  ModalModule,
  PopoverModule,
  ButtonCloseDirective,
  BadgeModule,
} from '@coreui/angular'
import {
  cilAddressBook,
  cilCog,
  cilDescription,
  cilOptions,
  cilSearch,
  cilTrash,
  cilUser,
} from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { EngineType } from 'src/app/enum/engine-type.enum'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { Transmission } from 'src/app/enum/transmission.enum'
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum'
import {
  VehicleFilterRequestModel,
  VehicleRegisterRequestModel,
} from 'src/app/model/vehicle-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import { VehicleService } from 'src/app/service/tenant/vehicle.service'
import { Utils } from 'src/app/utils/utils'
import { XPaginationComponent } from 'src/app/component/x-pagination/x-pagination.component'
import { CreateEditComponent } from './components/create-edit/create-edit.component'
import { VehicleStatus } from '../../enum/vehicle-status.enum'

@Component({
  selector: 'app-vehicle',
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
    ColDirective,
    ReactiveFormsModule,
    ButtonDirective,
    TableDirective,
    AvatarModule,
    SpinnerModule,
    ModalModule,
    PopoverModule,
    ButtonCloseDirective,
    BadgeModule,
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
})
export class VehicleComponent implements OnInit {
  private vehicleService = inject(VehicleService)
  public utils = inject(Utils)

  public icons = {
    cilAddressBook,
    cilUser,
    cilDescription,
    cilCog,
    cilOptions,
    cilSearch,
    cilTrash,
  }

  public loadings = {
    vehicle: false,
    vehicleRegister: false,
    vehicleDeleting: false,
  }

  public vehicleFilter = new VehicleFilterRequestModel()
  public pagination = new PaginationRequestModel()
  public addEditRequestModel = new VehicleRegisterRequestModel()

  public dataPagination: any = {}
  public isAddEditModalVisible = false

  public engineTypeEnumList = Object.values(EngineType).filter(
    (value) => typeof value === 'string'
  )
  public vehicleBrandEnumList = Object.values(VehicleBrand).filter(
    (value) => typeof value === 'string'
  )
  public transmissionEnumList = Object.values(Transmission).filter(
    (value) => typeof value === 'string'
  )

  ngOnInit(): void {
    this.doGetVehicleList()
  }

  doGetVehicleList() {
    this.loadings.vehicle = true

    this.vehicleService
      .getVehicleList(this.vehicleFilter, this.pagination)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.dataPagination = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.vehicle = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.vehicle = false
        },
      })
  }

  doRegisterVehicle() {
    this.loadings.vehicleRegister = true

    this.vehicleService.registerVehicle(this.addEditRequestModel).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetVehicleList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.vehicleRegister = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.vehicleRegister = false
      },
    })
  }

  doUpdateVehicle() {
    this.loadings.vehicleRegister = true

    this.vehicleService.updateVehicle(this.addEditRequestModel).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetVehicleList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.vehicleRegister = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.vehicleRegister = false
      },
    })
  }

  doDeleteVehicle() {
    this.loadings.vehicleDeleting = true

    this.vehicleService.deleteVehicle(this.addEditRequestModel.id!!).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetVehicleList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.vehicleDeleting = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.vehicleDeleting = false
      },
    })
  }

  resetFilter() {
    this.vehicleFilter = new VehicleFilterRequestModel()
    this.pagination.reset()

    this.doGetVehicleList()
  }

  filter() {
    this.pagination.reset()
    this.doGetVehicleList()
  }

  paginationChange(event: PaginationRequestModel) {
    this.pagination = event
    this.doGetVehicleList()
  }

  requestChange(event: VehicleRegisterRequestModel) {
    this.addEditRequestModel = event
  }

  toogleAddEditModal() {
    this.isAddEditModalVisible = !this.isAddEditModalVisible
  }

  selectVehicle(data: VehicleRegisterRequestModel) {
    this.addEditRequestModel.id = data.id
    this.addEditRequestModel.productId = data.productId
    this.addEditRequestModel.productName = data.productName
    this.addEditRequestModel.licenseNumber = data.licenseNumber
    this.addEditRequestModel.year = data.year

    this.isAddEditModalVisible = true
  }

  addEditModalVisibleChange(event: boolean) {
    this.isAddEditModalVisible = event

    if (!event) {
      this.addEditRequestModel.reset()
    }
  }

  saveVehicle() {
    if (this.addEditRequestModel.id) {
      this.doUpdateVehicle()
    } else {
      this.doRegisterVehicle()
    }
  }

  getVehicleStatusColor(value: any): string {
    return value == VehicleStatus[VehicleStatus.AVAILABLE]
      ? 'success'
      : 'danger'
  }
}
