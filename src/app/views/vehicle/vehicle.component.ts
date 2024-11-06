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
  cilCog,
  cilDescription,
  cilOptions,
  cilSearch,
  cilUser,
} from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { XSpinnerComponent } from 'src/app/component/x-spinner/x-spinner.component'
import { EngineType } from 'src/app/enum/engine-type.enum'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { Transmission } from 'src/app/enum/transmission.enum'
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum'
import { VehicleFilterRequestModel } from 'src/app/model/vehicle-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import { VehicleService } from 'src/app/service/tenant/vehicle.service'
import { Utils } from 'src/app/utils/utils'
import { RouterLink } from '@angular/router'
import { XPaginationComponent } from 'src/app/component/x-pagination/x-pagination.component'

@Component({
  selector: 'app-vehicle',
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
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
})
export class VehicleComponent implements OnInit {
  public icons = {
    cilAddressBook,
    cilUser,
    cilDescription,
    cilCog,
    cilOptions,
    cilSearch,
    cilChevronDoubleLeft,
    cilChevronLeft,
    cilChevronDoubleRight,
    cilChevronRight,
  }

  public loadings = { vehicle: false }

  public vehicleFilter = new VehicleFilterRequestModel()
  public pagination = new PaginationRequestModel()

  public dataPagination: any = {}

  public engineTypeEnumList = Object.values(EngineType).filter(
    (value) => typeof value === 'string'
  )
  public vehicleBrandEnumList = Object.values(VehicleBrand).filter(
    (value) => typeof value === 'string'
  )
  public transmissionEnumList = Object.values(Transmission).filter(
    (value) => typeof value === 'string'
  )

  constructor(private vehicleService: VehicleService, private utils: Utils) {}

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

  resetFilter() {
    this.vehicleFilter = new VehicleFilterRequestModel()

    this.doGetVehicleList()
  }

  paginationChange(event: PaginationRequestModel) {
    this.pagination = event
    this.doGetVehicleList()
  }
}
