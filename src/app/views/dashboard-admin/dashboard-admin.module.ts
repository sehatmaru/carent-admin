import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileGuardService } from '../../guard/profile.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ProfileGuardService]
})
export class DashboardAdminModule { }
