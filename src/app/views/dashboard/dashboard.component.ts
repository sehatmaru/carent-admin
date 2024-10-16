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

  constructor(
    private utils: Utils
  ) { }
  
  ngOnInit(): void {
    this.getTournamentList()
  }

  getTournamentList() {
  }

}
