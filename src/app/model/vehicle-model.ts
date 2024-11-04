import { Transmission } from '../enum/transmission.enum'
import { VehicleBrand } from '../enum/vehicle-brand.enum'
import { ProductStatus } from '../enum/product-status.enum'
import { EngineType } from '../enum/engine-type.enum'

export class VehicleFilterRequestModel {
  public id: number | null = null
  public name: string | null = null
  public productId: number | null = null
  public year: string | null = null
  public licenseNumber: string | null = null
  public transmission: Transmission.MATIC | null = null
  public brand: VehicleBrand.BYD | null = null
  public engineType: EngineType | null = null
}

export class VehicleResponseModel {
  public id = 0
  public productId = 0
  public productName = 0
  public name = ''
  public price = 0
  public engineType = EngineType.GASOLINE
  public transmission = Transmission.MATIC
  public brand = VehicleBrand.BYD
  public year = false
  public licenseNumber = ProductStatus.AVAILABLE
  public createdDate = new Date()
}
