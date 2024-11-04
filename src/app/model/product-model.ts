import { Transmission } from '../enum/transmission.enum'
import { VehicleBrand } from '../enum/vehicle-brand.enum'
import { ProductStatus } from '../enum/product-status.enum'
import { EngineType } from '../enum/engine-type.enum'

export class ProductSearchRequestModel {
  public id: number | null = null
  public name = ''
  public priceStart: number | null = null
  public priceEnd: number | null = null
  public provinceId: number | null = null
  public regencyId: number | null = null
  public districtId: number | null = null
  public transmission: Transmission.MATIC | null = null
  public brand: VehicleBrand.BYD | null = null
  public engineType: EngineType | null = null
  public startDate: Date | null = null
  public endDate: Date | null = null
  public deliverable: false | null = null
  public status: ProductStatus | null = null
}

export class ProductListResponseModel {
  public id = 0
  public seat = 0
  public name = ''
  public price = 0
  public transmission = Transmission.MATIC
  public brand = VehicleBrand.BYD
  public engineType = EngineType.GASOLINE
  public deliverable = false
  public status = ProductStatus.AVAILABLE
  public createdDate = new Date()
}
