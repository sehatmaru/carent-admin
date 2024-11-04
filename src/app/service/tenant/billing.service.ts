import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse } from '../../interface/common.interface'
import {
  BillingFilterRequestModel,
  BillingListResponseModel,
} from '../../model/billing-model'

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private root = `/billing`

  constructor(private commonApi: CommonService) {}

  getBillingList(
    request: BillingFilterRequestModel
  ): Observable<CommonResponse<BillingListResponseModel[]>> {
    return this.commonApi.post(`${this.root}/list`, request) as Observable<
      CommonResponse<BillingListResponseModel[]>
    >
  }
}
