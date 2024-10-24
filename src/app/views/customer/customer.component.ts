import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowComponent, ColComponent, CardModule, FormModule, ColDirective, ButtonDirective, TableDirective, AvatarModule, SpinnerModule } from '@coreui/angular';
import { cilUser, cilAddressBook } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { XSpinnerComponent } from 'src/app/component/x-spinner/x-spinner.component';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { CustomerFilterRequest, TenantCustomerResponse } from 'src/app/model/customer-model';
import { ManagerService } from 'src/app/service/tenant/manager.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [XSpinnerComponent, RowComponent, ColComponent, CardModule, CommonModule, FormModule, FormsModule, IconDirective, ColDirective, ReactiveFormsModule, ButtonDirective, TableDirective, AvatarModule, SpinnerModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {

  public icons = { cilAddressBook, cilUser };

  public loadings = { customer: false }

  public customerFilter = new CustomerFilterRequest()

  public customerList: TenantCustomerResponse[] = []

  constructor(
    private managerService: ManagerService,
    private utils: Utils
  ) {
    
  }

  ngOnInit(): void {
    this.doGetCustomerList()
  }

  doGetCustomerList() {
    this.loadings.customer = true
  
    this.managerService.getCustomerList(this.customerFilter).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.customerList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.customer = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.customer = false
      }
    });
  }
}
