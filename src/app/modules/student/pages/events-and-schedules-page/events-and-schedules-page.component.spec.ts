import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAndSchedulesPageComponent } from './events-and-schedules-page.component';

describe('EventsAndSchedulesPageComponent', () => {
  let component: EventsAndSchedulesPageComponent;
  let fixture: ComponentFixture<EventsAndSchedulesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsAndSchedulesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsAndSchedulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
