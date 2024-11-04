import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse } from '../../interface/common.interface'
import {
  BookingFilterRequestModel,
  BookingListResponseModel,
} from '../../model/booking-model'

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private root = `/booking`

  constructor(private commonApi: CommonService) {}

  getBookingList(
    request: BookingFilterRequestModel
  ): Observable<CommonResponse<BookingListResponseModel[]>> {
    return this.commonApi.post(`${this.root}/list`, request) as Observable<
      CommonResponse<BookingListResponseModel[]>
    >
  }
}
