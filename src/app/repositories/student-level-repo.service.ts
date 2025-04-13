import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';


export type StudentLevel = {
  id: number;
  grade_level_id: number;
  grade_section_id: number;
  school_year_id: number;

  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentLevelRepoService extends CrudRepo<StudentLevel> {

  constructor(http: HttpClient) {
    super(http, "academic-management", "student-levels");
  }
}
