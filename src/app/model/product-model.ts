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
  public quantity = 0
  public available = 0
  public transmission = Transmission.MATIC
  public brand = VehicleBrand.BYD
  public engineType = EngineType.GASOLINE
  public deliverable = false
  public status = ProductStatus.AVAILABLE
  public createdDate = new Date()
}

export class ProductRegisterRequestModel {
  public id: number | null = null
  public name: string | null = null
  public price = 0
  public deliverable: boolean | null = null
  public quantity = 0
  public available = 0
  public transmission: Transmission | null = null
  public seat = 0
  public engineType: EngineType.GASOLINE | null = null
  public brand: VehicleBrand.BYD | null = null

  isValid(): boolean {
    return (
      this.isTextValid(this.name) &&
      this.isPriceValid() &&
      this.isSelectValid(this.deliverable) &&
      this.isNumberValid(this.quantity) &&
      this.isNumberValid(this.available) &&
      this.isSelectValid(this.transmission) &&
      this.isNumberValid(this.seat) &&
      this.isSelectValid(this.engineType) &&
      this.isSelectValid(this.brand)
    )
  }

  isTextValid(value: any): boolean {
    return value != null && value != ''
  }

  isNumberValid(value: any): boolean {
    return value != null && value > 0
  }

  isPriceValid(): boolean {
    return this.price != null && this.price > 10000
  }

  isSelectValid(value: any): boolean {
    return value != null
  }

  reset() {
    this.id = null
    this.name = ''
    this.price = 0
    this.deliverable = null
    this.quantity = 0
    this.available = 0
    this.transmission = null
    this.seat = 0
    this.engineType = null
    this.brand = null
  }
}
