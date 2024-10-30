import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';
import { CommonResponse } from '../../interface/common.interface';
import { VehicleFilterRequestModel, VehicleResponseModel } from '../../model/vehicle-model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private root = `/vehicle`;
  
  constructor(
    private commonApi: CommonService
  ) { }

  getVehicleList(request: VehicleFilterRequestModel): Observable<CommonResponse<VehicleResponseModel[]>> {
    return this.commonApi.post(`${this.root}/list`, request) as Observable<CommonResponse<VehicleResponseModel[]>>;
  }

}
