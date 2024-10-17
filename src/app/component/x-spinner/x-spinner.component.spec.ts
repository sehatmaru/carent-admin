import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XSpinnerComponent } from './x-spinner.component';

describe('XSpinnerComponent', () => {
  let component: XSpinnerComponent;
  let fixture: ComponentFixture<XSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
