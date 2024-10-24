import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';
import { CommonResponse } from '../../interface/common.interface';
import { CustomerFilterRequest, TenantCustomerResponse } from '../../model/customer-model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private root = `/manager`;
  
  constructor(
    private commonApi: CommonService
  ) { }

  getCustomerList(request: CustomerFilterRequest): Observable<CommonResponse<TenantCustomerResponse[]>> {
    return this.commonApi.post(`${this.root}/customer/list`, request) as Observable<CommonResponse<TenantCustomerResponse[]>>;
  }

}