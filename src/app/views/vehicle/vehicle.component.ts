import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, CardModule, FormModule, ColDirective, ButtonDirective, TableDirective, AvatarModule, SpinnerModule } from '@coreui/angular';
import { cilAddressBook, cilCog, cilDescription, cilOptions, cilSearch, cilUser } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { XSpinnerComponent } from 'src/app/component/x-spinner/x-spinner.component';
import { EngineType } from 'src/app/enum/engine-type.enum';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { Transmission } from 'src/app/enum/transmission.enum';
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum';
import { VehicleFilterRequestModel, VehicleResponseModel } from 'src/app/model/vehicle-model';
import { VehicleService } from 'src/app/service/tenant/vehicle.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [XSpinnerComponent, RowComponent, ColComponent, CardModule, CommonModule, FormModule, FormsModule, IconDirective, ColDirective, ReactiveFormsModule, ButtonDirective, TableDirective, AvatarModule, SpinnerModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {

  public icons = { cilAddressBook, cilUser, cilDescription, cilCog, cilOptions, cilSearch };

  public loadings = { vehicle: false }

  public vehicleFilter = new VehicleFilterRequestModel()

  public vehicleList: VehicleResponseModel[] = []

  public engineTypeEnumList = Object.values(EngineType).filter(value => typeof value === 'string')
  public vehicleBrandEnumList = Object.values(VehicleBrand).filter(value => typeof value === 'string')
  public transmissionEnumList = Object.values(Transmission).filter(value => typeof value === 'string')

  constructor(
    private vehicleService: VehicleService,
    private utils: Utils
  ) {
    
  }

  ngOnInit(): void {
    this.doGetVehicleList()
  }

  doGetVehicleList() {
    this.loadings.vehicle = true
  
    this.vehicleService.getVehicleList(this.vehicleFilter).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.vehicleList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.vehicle = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.vehicle = false
      }
    });
  }

  resetFilter() {
    this.vehicleFilter = new VehicleFilterRequestModel()

    this.doGetVehicleList()
  }
}
