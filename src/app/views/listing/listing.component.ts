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
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
})
export class ListingComponent implements OnInit {
  private productService = inject(ProductService)
  private utils = inject(Utils)

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
  }

  public pagination = new PaginationRequestModel()
  public productFilter = new ProductSearchRequestModel()
  public addEditRequestModel = new ProductRegisterRequestModel()

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
  public productStatusEnumList = Object.values(ProductStatus).filter(
    (value) => typeof value === 'string'
  )

  ngOnInit(): void {
    this.doGetProductList()
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
    this.addEditRequestModel.quantity = data.quantity
    this.addEditRequestModel.available = data.available
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
}
