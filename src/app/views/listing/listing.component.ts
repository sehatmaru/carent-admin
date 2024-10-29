import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, CardModule, FormModule, ColDirective, ButtonDirective, TableDirective, AvatarModule, SpinnerModule } from '@coreui/angular';
import { cilAddressBook, cilCog, cilDescription, cilOptions, cilSearch, cilUser } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { XSpinnerComponent } from 'src/app/component/x-spinner/x-spinner.component';
import { EngineType } from 'src/app/enum/engine-type.enum';
import { ProductStatus } from 'src/app/enum/product-status.enum';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { Transmission } from 'src/app/enum/transmission.enum';
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { ProductSearchRequestModel, TenantProductListResponseModel } from 'src/app/model/product-model';
import { ProductService } from 'src/app/service/tenant/product.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [XSpinnerComponent, RowComponent, ColComponent, CardModule, CommonModule, FormModule, FormsModule, IconDirective, ColDirective, ReactiveFormsModule, ButtonDirective, TableDirective, AvatarModule, SpinnerModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

  public icons = { cilAddressBook, cilUser, cilDescription, cilCog, cilOptions, cilSearch };

  public loadings = { product: false }

  public productFilter = new ProductSearchRequestModel()

  public productList: TenantProductListResponseModel[] = []

  public vehicleTypeEnumList = Object.values(VehicleType).filter(value => typeof value === 'string')
  public engineTypeEnumList = Object.values(EngineType).filter(value => typeof value === 'string')
  public vehicleBrandEnumList = Object.values(VehicleBrand).filter(value => typeof value === 'string')
  public transmissionEnumList = Object.values(Transmission).filter(value => typeof value === 'string')
  public productStatusEnumList = Object.values(ProductStatus).filter(value => typeof value === 'string')

  constructor(
    private productService: ProductService,
    private utils: Utils
  ) {
    
  }

  ngOnInit(): void {
    this.doGetProductList()
  }

  doGetProductList() {
    this.loadings.product = true
  
    this.productService.getProductList(this.productFilter).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.productList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.product = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.product = false
      }
    });
  }

  resetFilter() {
    this.productFilter = new ProductSearchRequestModel()

    this.doGetProductList()
  }
}
