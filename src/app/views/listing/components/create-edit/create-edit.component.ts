import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
  ButtonCloseDirective,
  ColComponent,
  FormModule,
  ListGroupModule,
  OffcanvasModule,
  SpinnerModule,
} from '@coreui/angular'
import { EngineType } from 'src/app/enum/engine-type.enum'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { Transmission } from 'src/app/enum/transmission.enum'
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum'
import { GeoListResponseModel } from 'src/app/model/geo-model'
import { ProductRegisterRequestModel } from 'src/app/model/product-model'
import { GeoService } from 'src/app/service/tenant/geo.service'
import { Utils } from 'src/app/utils/utils'

@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [
    ColComponent,
    FormModule,
    FormsModule,
    OffcanvasModule,
    SpinnerModule,
    ButtonCloseDirective,
    ListGroupModule,
  ],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss',
})
export class CreateEditComponent implements OnInit {
  private geoService = inject(GeoService)
  private utils = inject(Utils)

  @Input()
  public isGeoLoading = false

  @Input()
  @Output()
  public requestModel = new ProductRegisterRequestModel()

  @Output()
  public requestChange = new EventEmitter<ProductRegisterRequestModel>()

  @Output()
  public onProvinceSelected = new EventEmitter<false>()

  @Output()
  public onRegencySelected = new EventEmitter<false>()

  public isCanvasVisible = {
    province: false,
    regency: false,
    district: false,
  }

  public provinceSearch = ''
  public regencySearch = ''
  public districtSearch = ''

  public engineTypeEnumList = Object.values(EngineType).filter(
    (value) => typeof value === 'string'
  )
  public vehicleBrandEnumList = Object.values(VehicleBrand).filter(
    (value) => typeof value === 'string'
  )
  public transmissionEnumList = Object.values(Transmission).filter(
    (value) => typeof value === 'string'
  )
  public provinceList: GeoListResponseModel[] = []
  public regencyList: GeoListResponseModel[] = []
  public districtList: GeoListResponseModel[] = []

  ngOnInit(): void {
    this.doGetProvinceList()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestModel']) {
      this.requestChange.emit(this.requestModel)
    }
  }

  doGetProvinceList() {
    this.isGeoLoading = true

    this.geoService.getProvinceList(this.provinceSearch).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.provinceList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.isGeoLoading = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.isGeoLoading = false
      },
    })
  }

  doGetRegencyList() {
    this.isGeoLoading = true

    this.geoService
      .getRegencyList(this.requestModel.provinceId!!, this.regencySearch)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.regencyList = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.isGeoLoading = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.isGeoLoading = false
        },
      })
  }

  doGetDistrictList() {
    this.isGeoLoading = true

    this.geoService
      .getDistrictList(this.requestModel.regencyId!!, this.districtSearch)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.districtList = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.isGeoLoading = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.isGeoLoading = false
        },
      })
  }

  selectProvinceSearch(id: number, name: string) {
    this.requestModel.provinceId = Number(id)
    this.requestModel.provinceName = name

    this.doGetRegencyList()
    this.requestModel.resetRegency()

    this.isCanvasVisible.province = false
  }

  selectRegencySearch(id: number, name: string) {
    this.requestModel.regencyId = Number(id)
    this.requestModel.regencyName = name

    this.doGetDistrictList()
    this.requestModel.resetDistrict()

    this.isCanvasVisible.regency = false
  }

  selectDistrictSearch(id: number, name: string) {
    this.requestModel.districtId = Number(id)
    this.requestModel.districtName = name

    this.isCanvasVisible.district = false
  }
}
