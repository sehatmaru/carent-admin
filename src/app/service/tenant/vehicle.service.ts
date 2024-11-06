import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse, Page } from '../../interface/common.interface'
import {
  VehicleFilterRequestModel,
  VehicleResponseModel,
} from '../../model/vehicle-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private root = `/vehicle`

  constructor(private commonApi: CommonService) {}

  getVehicleList(
    request: VehicleFilterRequestModel,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<VehicleResponseModel[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/list?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<VehicleResponseModel[]>>>
  }
}
