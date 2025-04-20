import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';

export type TeacherSubject = {
  id: number,
  teacher_id: number;
  grade_level_id: number;
  grade_section_id: number;
  subject_id: number;
  school_year_id: number;

  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectRepoService extends CrudRepo<TeacherSubject> {

  constructor(http: HttpClient) {
    super(http, "subject-management" ,"teacher-subjects");
  }
}
