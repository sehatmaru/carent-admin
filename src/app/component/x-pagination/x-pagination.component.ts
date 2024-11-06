import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import {
  SpinnerModule,
  PaginationComponent,
  PageItemDirective,
  PageLinkDirective,
  CardModule,
  ColComponent,
  RowComponent,
  ButtonDirective,
  ColDirective,
  FormModule,
} from '@coreui/angular'
import {
  cilChevronDoubleLeft,
  cilChevronLeft,
  cilChevronDoubleRight,
  cilChevronRight,
} from '@coreui/icons'
import { IconDirective } from '@coreui/icons-angular'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

@Component({
  selector: 'app-x-pagination',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardModule,
    CommonModule,
    IconDirective,
    FormsModule,
    FormModule,
    ColDirective,
    ReactiveFormsModule,
    ButtonDirective,
    SpinnerModule,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    RouterLink,
  ],
  templateUrl: './x-pagination.component.html',
  styleUrl: './x-pagination.component.scss',
})
export class XPaginationComponent {
  public icons = {
    cilChevronDoubleLeft,
    cilChevronLeft,
    cilChevronDoubleRight,
    cilChevronRight,
  }

  @Input()
  public pagination = new PaginationRequestModel()

  @Input()
  public dataPagination: any = {}

  @Output()
  public paginationChange = new EventEmitter<PaginationRequestModel>()

  pageChange() {
    this.paginationChange.emit(
      new PaginationRequestModel(
        this.pagination.pageNumber,
        this.pagination.pageSize
      )
    )
  }
}
