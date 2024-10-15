import { Component, OnInit } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {

  constructor(
    private utils: Utils
  ) { }
  
  ngOnInit(): void {
    this.getTournamentList()
  }

  getTournamentList() {
  }
}
