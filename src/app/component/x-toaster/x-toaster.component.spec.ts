import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XToasterComponent } from './x-toaster.component';

describe('XToasterComponent', () => {
  let component: XToasterComponent;
  let fixture: ComponentFixture<XToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XToasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
