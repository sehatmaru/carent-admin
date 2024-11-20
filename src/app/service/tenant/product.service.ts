import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse, Page } from '../../interface/common.interface'
import {
  ProductSearchRequestModel,
  ProductListResponseModel,
  ProductRegisterRequestModel,
  ProductOptionListResponseModel,
} from '../../model/product-model'
import { PaginationRequestModel } from '../../model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private root = `/product`

  constructor(private commonApi: CommonService) {}

  getProductList(
    request: ProductSearchRequestModel,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<ProductListResponseModel[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/list?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<ProductListResponseModel[]>>>
  }

  getProductOptionList(
    name: string
  ): Observable<CommonResponse<ProductOptionListResponseModel[]>> {
    const params = {
      name: name,
    }

    return this.commonApi.get(
      `${this.root}/list/option?${this.commonApi.getSearchParams(params)}`
    ) as Observable<CommonResponse<ProductOptionListResponseModel[]>>
  }

  registerProduct(
    request: ProductRegisterRequestModel
  ): Observable<CommonResponse<any>> {
    return this.commonApi.post(`${this.root}/register`, request) as Observable<
      CommonResponse<any>
    >
  }

  updateProduct(
    request: ProductRegisterRequestModel
  ): Observable<CommonResponse<any>> {
    return this.commonApi.post(
      `${this.root}/update/${request.id}`,
      request
    ) as Observable<CommonResponse<any>>
  }

  deleteProduct(productId: number): Observable<CommonResponse<any>> {
    return this.commonApi.post(
      `${this.root}/delete/${productId}`,
      null
    ) as Observable<CommonResponse<any>>
  }
}
