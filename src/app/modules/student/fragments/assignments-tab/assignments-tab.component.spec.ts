import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsTabComponent } from './assignments-tab.component';

describe('AssignmentsTabComponent', () => {
  let component: AssignmentsTabComponent;
  let fixture: ComponentFixture<AssignmentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
