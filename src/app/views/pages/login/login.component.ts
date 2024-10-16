import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, SpinnerModule, FormSelectDirective, FormModule, ToasterPlacement, ToasterComponent } from '@coreui/angular';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { LoginRequestModel } from 'src/app/model/auth-model';
import { StorageService } from 'src/app/service/storage.service';
import { Utils } from 'src/app/utils/utils';
import { cilLockLocked, cilTouchApp, cilUser } from '@coreui/icons';
import { FormsModule } from '@angular/forms';
import { ToastType } from 'src/app/enum/toast-type.enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, SpinnerModule, CommonModule, FormSelectDirective, FormModule, FormsModule]
})
export class LoginComponent {

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  public icons = { cilUser, cilLockLocked, cilTouchApp };

  public loginRequest = new LoginRequestModel()

  public loadings: number[] = []
  public isLoginLoading = false

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private utils: Utils
  ) { }

  ngOnInit(): void {
  }

  doLogin() {
    if (this.loginRequest.isValid()) {
      this.loadings.push(1)
      this.isLoginLoading = true
  
      this.authService.doLogin(this.loginRequest).subscribe({

        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.storageService.setLogin(
              resp.result.username,
              resp.result.role,
              resp.result.accessToken
            )
  
            this.router.navigateByUrl('');
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }
  
          this.loadings.pop()
          this.isLoginLoading = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.pop()
          this.isLoginLoading = false
        }
     });
    }
  }

  toRegister() {
    this.router.navigateByUrl('register')
  }

  toForgotPassword() {
    this.router.navigateByUrl('forgot-password')
  }

}
