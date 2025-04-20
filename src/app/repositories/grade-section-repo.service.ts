import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';

export type GradeSection = {
  id: number;
  grade_level_id: number;
  section_name: string;

  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class GradeSectionRepoService extends CrudRepo<GradeSection> {

  constructor(http: HttpClient) {
    super(http, "academic-management", "grade-sections");
  }

}
