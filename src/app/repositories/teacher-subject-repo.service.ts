import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';


export interface TeacherSubject {
  id: number;
  subject_id: number;
  teacher_id: number;
  school_year_id: number;
  class_section_id: number;

  created_by: number;
  updated_by?: number;

  created_at: string; // ISO string format of datetime
  updated_at: string; // ISO string format of datetime
}

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectRepoService extends CrudRepo<TeacherSubject> {

  constructor(http: HttpClient) {
    super(http, "subject-management" ,"teacher-subjects");
  }
}
