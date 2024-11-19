import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ColComponent, FormModule } from '@coreui/angular'
import { EngineType } from 'src/app/enum/engine-type.enum'
import { Transmission } from 'src/app/enum/transmission.enum'
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum'
import { ProductRegisterRequestModel } from 'src/app/model/product-model'

@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [ColComponent, FormModule, FormsModule],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss',
})
export class CreateEditComponent {
  @Input()
  @Output()
  public requestModel = new ProductRegisterRequestModel()

  @Output()
  public requestChange = new EventEmitter<ProductRegisterRequestModel>()

  public engineTypeEnumList = Object.values(EngineType).filter(
    (value) => typeof value === 'string'
  )
  public vehicleBrandEnumList = Object.values(VehicleBrand).filter(
    (value) => typeof value === 'string'
  )
  public transmissionEnumList = Object.values(Transmission).filter(
    (value) => typeof value === 'string'
  )

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestModel']) {
      this.requestChange.emit(this.requestModel)
    }
  }
}