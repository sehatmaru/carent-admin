import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse, Page } from '../../interface/common.interface'
import {
  CustomerFilterRequest,
  TenantCustomerResponse,
} from '../../model/customer-model'
import { AdminResponse } from '../../model/admin-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private root = `/manager`

  constructor(private commonApi: CommonService) {}

  getCustomerList(
    request: CustomerFilterRequest,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<TenantCustomerResponse[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/customer/list?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<TenantCustomerResponse[]>>>
  }

  getAdminList(
    request: CustomerFilterRequest,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<AdminResponse[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/admin/list?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<AdminResponse[]>>>
  }
}
