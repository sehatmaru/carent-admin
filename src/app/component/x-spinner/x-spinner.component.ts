import { Component } from '@angular/core';
import { CardComponent, ColComponent, SpinnerModule } from '@coreui/angular';

@Component({
  selector: 'app-x-spinner',
  standalone: true,
  imports: [ColComponent, CardComponent, SpinnerModule],
  templateUrl: './x-spinner.component.html',
  styleUrl: './x-spinner.component.scss'
})
export class XSpinnerComponent {

}
