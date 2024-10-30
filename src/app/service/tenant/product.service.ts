import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';
import { CommonResponse } from '../../interface/common.interface';
import { ProductSearchRequestModel, ProductListResponseModel } from '../../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private root = `/product`;
  
  constructor(
    private commonApi: CommonService
  ) { }

  getProductList(request: ProductSearchRequestModel): Observable<CommonResponse<ProductListResponseModel[]>> {
    return this.commonApi.post(`${this.root}/list`, request) as Observable<CommonResponse<ProductListResponseModel[]>>;
  }

}
