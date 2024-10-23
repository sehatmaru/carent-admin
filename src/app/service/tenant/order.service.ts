import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';
import { CommonResponse } from '../../interface/common.interface';
import { OrderHistoryResponseModel } from '../../model/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private root = `/order`;
  
  constructor(
    private commonApi: CommonService
  ) { }

  getDashboardOrderHistory(): Observable<CommonResponse<OrderHistoryResponseModel[]>> {
    return this.commonApi.get(`${this.root}/dashboard/history`) as Observable<CommonResponse<OrderHistoryResponseModel[]>>;
  }

}
