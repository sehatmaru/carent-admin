import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XPaginationComponent } from './x-pagination.component';

describe('XPaginationComponent', () => {
  let component: XPaginationComponent;
  let fixture: ComponentFixture<XPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
