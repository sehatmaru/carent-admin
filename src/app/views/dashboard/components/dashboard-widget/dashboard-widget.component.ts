import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective } from '@coreui/angular';

@Component({
    selector: 'app-dashboard-widget',
    templateUrl: './dashboard-widget.component.html',
    styleUrls: ['./dashboard-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, IconDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterLink, DropdownDividerDirective, ChartjsComponent]
})
export class DashboardWidgetComponent implements OnInit, AfterContentInit {

  @Input() title = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  data: any[] = [];
  options: any[] = [];
  labels = [
    'May',
    'June',
    'July',
    'August',
    'September',
    'October'
  ];
  datasets = [
    [{
      label: 'Income',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [78, 81, 80, 45, 34, 12],
    }], [{
      label: 'Revenue',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [78, 81, 80, 45, 34, 12],
    }], [{
      label: 'Orders',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12],
      fill: true
    }], [{
      label: 'Customers',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.setData();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: this.labels,
        datasets: this.datasets[idx]
      };
    }
    this.setOptions();
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.tension = 0;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
}
