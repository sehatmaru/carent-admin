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
import { StatusCode } from 'src/app/enum/status-code.enum'
import { ProductOptionListResponseModel } from 'src/app/model/product-model'
import { VehicleRegisterRequestModel } from 'src/app/model/vehicle-model'
import { ProductService } from 'src/app/service/tenant/product.service'
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
  private productService = inject(ProductService)
  private utils = inject(Utils)

  @Input()
  @Output()
  public requestModel = new VehicleRegisterRequestModel()

  @Output()
  public requestChange = new EventEmitter<VehicleRegisterRequestModel>()

  public isProductCanvasVisible = false
  public isProductLoading = false

  public productList: ProductOptionListResponseModel[] = []

  public productSearch = ''

  ngOnInit(): void {
    this.doGetProductList()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestModel']) {
      this.requestChange.emit(this.requestModel)
    }
  }

  doGetProductList() {
    this.isProductLoading = true

    this.productService.getProductOptionList(this.productSearch).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.productList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.isProductLoading = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.isProductLoading = false
      },
    })
  }

  selectProductSearch(id: number, name: string) {
    this.requestModel.productId = Number(id)
    this.requestModel.productName = name

    this.isProductCanvasVisible = false
  }
}
