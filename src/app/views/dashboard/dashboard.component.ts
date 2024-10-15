import { Component, OnInit, ViewChild } from '@angular/core';
import { Utils } from '../../utils/utils';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { DefaultToasterComponent } from 'src/app/layout';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  @ViewChild('c-toaster') toaster!: ToasterComponent;

  constructor(
    private utils: Utils
  ) { }
  
  ngOnInit(): void {
    this.getTournamentList()
  }

  getTournamentList() {
  }


  addToast() {
    const options = {
      title: `CoreUI for Angular Toast`,
      delay: 5000,
      placement: ToasterPlacement.TopEnd,
      color: 'info',
      autohide: true
    };
    const componentRef = this.toaster.addToast(DefaultToasterComponent, { ...options });
  }
}
