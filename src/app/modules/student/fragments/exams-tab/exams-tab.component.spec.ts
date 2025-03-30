import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsTabComponent } from './exams-tab.component';

describe('ExamsTabComponent', () => {
  let component: ExamsTabComponent;
  let fixture: ComponentFixture<ExamsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
