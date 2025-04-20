import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type Subject = {
  id: number;
  subject_name: string;
  subject_code: string;
  description?: string;
  grade_level_id: number;
  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class SubjectRepoService extends CrudRepo<Subject> {

  constructor(http: HttpClient) {
    super(http, "subject-management", "subjects");
  }
}
