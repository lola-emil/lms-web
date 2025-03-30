import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAnAnnouncementComponent } from './make-an-announcement.component';

describe('MakeAnAnnouncementComponent', () => {
  let component: MakeAnAnnouncementComponent;
  let fixture: ComponentFixture<MakeAnAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeAnAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeAnAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
