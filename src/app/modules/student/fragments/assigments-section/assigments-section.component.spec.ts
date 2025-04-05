import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentsSectionComponent } from './assigments-section.component';

describe('AssigmentsSectionComponent', () => {
  let component: AssigmentsSectionComponent;
  let fixture: ComponentFixture<AssigmentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigmentsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
