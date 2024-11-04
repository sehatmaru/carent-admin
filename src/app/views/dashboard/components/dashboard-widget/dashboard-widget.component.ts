import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { getStyle } from '@coreui/utils'
import { ChartjsComponent } from '@coreui/angular-chartjs'
import { RouterLink } from '@angular/router'
import { IconDirective } from '@coreui/icons-angular'
import {
  RowComponent,
  ColComponent,
  WidgetStatAComponent,
  TemplateIdDirective,
  ThemeDirective,
  DropdownComponent,
  ButtonDirective,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  DropdownDividerDirective,
  SpinnerModule,
  CardModule,
} from '@coreui/angular'
import { CommonModule } from '@angular/common'
import { BalanceReportResponseModel } from 'src/app/model/finance-model'

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    WidgetStatAComponent,
    TemplateIdDirective,
    IconDirective,
    ThemeDirective,
    DropdownComponent,
    ButtonDirective,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    DropdownDividerDirective,
    ChartjsComponent,
    SpinnerModule,
    CardModule,
    CommonModule,
  ],
})
export class DashboardWidgetComponent
  implements OnInit, OnChanges, AfterContentInit
{
  @Input() reportData!: BalanceReportResponseModel

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  data: any[] = []
  options: any[] = []

  datasets = [
    [
      {
        label: 'Income',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: [0],
      },
    ],
    [
      {
        label: 'Revenue',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-info'),
        pointHoverBorderColor: getStyle('--cui-info'),
        data: [],
      },
    ],
    [
      {
        label: 'Orders',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-warning'),
        pointHoverBorderColor: getStyle('--cui-warning'),
        data: [],
        fill: true,
      },
    ],
    [
      {
        label: 'Customers',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: [],
        barPercentage: 0.7,
      },
    ],
  ]
  optionsDefault = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  }

  ngOnInit(): void {
    // this.setData()
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reportData']) {
      const currentValue: BalanceReportResponseModel =
        changes['reportData'].currentValue
      if (currentValue.customerHistory.length != 0) {
        this.setData()
      }
    }
  }

  setData() {
    const labels = this.reportData.customerHistory.map((item) => item.month)

    this.datasets[0][0].data = this.reportData.incomeHistory.map(
      (item) => item.value
    )
    this.datasets[1][0].data = this.reportData.revenueHistory.map(
      (item) => item.value
    )
    this.datasets[2][0].data = this.reportData.orderHistory.map(
      (item) => item.value
    )
    this.datasets[3][0].data = this.reportData.customerHistory.map(
      (item) => item.value
    )

    this.data[0] = {
      labels: labels,
      datasets: this.datasets[0],
    }

    this.data[1] = {
      labels: labels,
      datasets: this.datasets[1],
    }

    this.data[2] = {
      labels: labels,
      datasets: this.datasets[2],
    }

    this.data[3] = {
      labels: labels,
      datasets: this.datasets[3],
    }

    this.setOptions()
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault))
      switch (idx) {
        case 0: {
          options.scales.x = { display: false }
          options.scales.y = { display: false }
          this.options.push(options)
          break
        }
        case 1: {
          options.scales.x = { display: false }
          options.scales.y = { display: false }
          options.elements.line.tension = 0
          this.options.push(options)
          break
        }
        case 2: {
          options.scales.x = { display: false }
          options.scales.y = { display: false }
          options.elements.line.borderWidth = 2
          options.elements.point.radius = 0
          this.options.push(options)
          break
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false }
          options.scales.x.grid = {
            display: false,
            drawTicks: false,
            drawBorder: false,
          }
          options.scales.y.min = undefined
          options.scales.y.max = undefined
          options.elements = {}
          this.options.push(options)
          break
        }
      }
    }
  }

  public getSvgIcon(value: number): string {
    if (value > 0) {
      return 'cilArrowTop'
    } else if (value < 0) {
      return 'cilArrowBottom'
    } else {
      return 'cilMinus'
    }
  }
}
