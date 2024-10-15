import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultToasterComponent } from './default-toaster.component';

describe('DefaultToasterComponent', () => {
  let component: DefaultToasterComponent;
  let fixture: ComponentFixture<DefaultToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultToasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
