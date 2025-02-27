import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAndReportComponent } from './progress-and-report.component';

describe('ProgressAndReportComponent', () => {
  let component: ProgressAndReportComponent;
  let fixture: ComponentFixture<ProgressAndReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressAndReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressAndReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
