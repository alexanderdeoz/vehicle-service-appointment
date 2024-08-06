import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReportStatusComponent } from './vehicle-report-status.component';

describe('VehicleReportStatusComponent', () => {
  let component: VehicleReportStatusComponent;
  let fixture: ComponentFixture<VehicleReportStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleReportStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleReportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
