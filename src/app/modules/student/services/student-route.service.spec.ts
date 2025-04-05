import { TestBed } from '@angular/core/testing';

import { StudentRouteService } from './student-route.service';

describe('StudentRouteService', () => {
  let service: StudentRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
