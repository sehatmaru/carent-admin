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
  SpinnerModule,
  ModalModule,
  ButtonModule,
  PopoverModule,
  ListGroupModule,
  OffcanvasModule,
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
import { XPaginationComponent } from 'src/app/component/x-pagination/x-pagination.component'
import { CreateEditComponent } from './components/create-edit/create-edit.component'
import { EngineType } from 'src/app/enum/engine-type.enum'
import { ProductStatus } from 'src/app/enum/product-status.enum'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { Transmission } from 'src/app/enum/transmission.enum'
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import {
  ProductRegisterRequestModel,
  ProductSearchRequestModel,
} from 'src/app/model/product-model'
import { ProductService } from 'src/app/service/tenant/product.service'
import { Utils } from 'src/app/utils/utils'
import { GeoListResponseModel } from '../../model/geo-model'
import { GeoService } from '../../service/tenant/geo.service'

@Component({
  selector: 'app-listing',
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
    ReactiveFormsModule,
    ButtonDirective,
    TableDirective,
    SpinnerModule,
    CreateEditComponent,
    ModalModule,
    ButtonModule,
    PopoverModule,
    ListGroupModule,
    OffcanvasModule,
    BadgeModule,
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
})
export class ListingComponent implements OnInit {
  private productService = inject(ProductService)
  private geoService = inject(GeoService)
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
    product: false,
    productRegister: false,
    productDeleting: false,
    geo: false,
  }

  public pagination = new PaginationRequestModel()
  public productFilter = new ProductSearchRequestModel()
  public addEditRequestModel = new ProductRegisterRequestModel()

  public provinceSearch = ''
  public regencySearch = ''
  public districtSearch = ''

  public dataPagination: any = {}
  public isAddEditModalVisible = false
  public isCanvasVisible = {
    province: false,
    regency: false,
    district: false,
  }

  public engineTypeEnumList = Object.values(EngineType).filter(
    (value) => typeof value === 'string'
  )
  public vehicleBrandEnumList = Object.values(VehicleBrand).filter(
    (value) => typeof value === 'string'
  )
  public transmissionEnumList = Object.values(Transmission).filter(
    (value) => typeof value === 'string'
  )
  public productStatusEnumList = Object.values(ProductStatus).filter(
    (value) => typeof value === 'string'
  )
  public provinceList: GeoListResponseModel[] = []
  public regencyList: GeoListResponseModel[] = []
  public districtList: GeoListResponseModel[] = []

  ngOnInit(): void {
    this.doGetProductList()
    this.doGetProvinceList()
  }

  doGetProductList() {
    this.loadings.product = true

    this.productService
      .getProductList(this.productFilter, this.pagination)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.dataPagination = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.product = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.product = false
        },
      })
  }

  doRegisterProduct() {
    this.loadings.productRegister = true

    this.productService.registerProduct(this.addEditRequestModel).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetProductList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.productRegister = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.productRegister = false
      },
    })
  }

  doUpdateProduct() {
    this.loadings.productRegister = true

    this.productService.updateProduct(this.addEditRequestModel).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetProductList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.productRegister = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.productRegister = false
      },
    })
  }

  doDeleteProduct() {
    this.loadings.productDeleting = true

    this.productService.deleteProduct(this.addEditRequestModel.id!!).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.doGetProductList()
          this.isAddEditModalVisible = false
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.productDeleting = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.productDeleting = false
      },
    })
  }

  doGetProvinceList() {
    this.loadings.geo = true

    this.geoService.getProvinceList(this.provinceSearch).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.provinceList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.geo = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.geo = false
      },
    })
  }

  doGetRegencyList() {
    this.loadings.geo = true

    this.geoService
      .getRegencyList(this.productFilter.provinceId!!, this.regencySearch)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.regencyList = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.geo = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.geo = false
        },
      })
  }

  doGetDistrictList() {
    this.loadings.geo = true

    this.geoService
      .getDistrictList(this.productFilter.regencyId!!, this.districtSearch)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.districtList = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.geo = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.geo = false
        },
      })
  }

  resetFilter() {
    this.productFilter = new ProductSearchRequestModel()
    this.pagination.reset()

    this.doGetProductList()
  }

  filter() {
    this.pagination.reset()
    this.doGetProductList()
  }

  paginationChange(event: PaginationRequestModel) {
    this.pagination = event
    this.doGetProductList()
  }

  requestChange(event: ProductRegisterRequestModel) {
    this.addEditRequestModel = event
  }

  toogleAddEditModal() {
    this.isAddEditModalVisible = !this.isAddEditModalVisible
  }

  selectProduct(data: ProductRegisterRequestModel) {
    this.addEditRequestModel.id = data.id
    this.addEditRequestModel.name = data.name
    this.addEditRequestModel.price = data.price
    this.addEditRequestModel.provinceId = data.provinceId
    this.addEditRequestModel.provinceName = data.provinceName
    this.addEditRequestModel.regencyId = data.regencyId
    this.addEditRequestModel.regencyName = data.regencyName
    this.addEditRequestModel.districtId = data.districtId
    this.addEditRequestModel.districtName = data.districtName
    this.addEditRequestModel.deliverable = data.deliverable
    this.addEditRequestModel.transmission = data.transmission
    this.addEditRequestModel.seat = data.seat
    this.addEditRequestModel.engineType = data.engineType
    this.addEditRequestModel.brand = data.brand

    this.isAddEditModalVisible = true
  }

  addEditModalVisibleChange(event: boolean) {
    this.isAddEditModalVisible = event

    if (!event) {
      this.addEditRequestModel.reset()
    }
  }

  saveProduct() {
    if (this.addEditRequestModel.id) {
      this.doUpdateProduct()
    } else {
      this.doRegisterProduct()
    }
  }

  selectProvinceSearch(id: number, name: string) {
    this.productFilter.provinceId = Number(id)
    this.productFilter.provinceName = name

    this.doGetRegencyList()
    this.productFilter.resetRegency()

    this.isCanvasVisible.province = false
  }

  selectRegencySearch(id: number, name: string) {
    this.productFilter.regencyId = Number(id)
    this.productFilter.regencyName = name

    this.doGetDistrictList()
    this.productFilter.resetDistrict()

    this.isCanvasVisible.regency = false
  }

  selectDistrictSearch(id: number, name: string) {
    this.productFilter.districtId = Number(id)
    this.productFilter.districtName = name

    this.isCanvasVisible.district = false
  }

  getProductStatusColor(value: any): string {
    return value == ProductStatus[ProductStatus.AVAILABLE]
      ? 'success'
      : 'danger'
  }
}
