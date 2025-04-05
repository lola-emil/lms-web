import { TestBed } from '@angular/core/testing';

import { TeacherRouteService } from './teacher-route.service';

describe('TeacherRouteService', () => {
  let service: TeacherRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
