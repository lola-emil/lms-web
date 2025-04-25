import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export interface ClassworkSubmission {
  id: number;
  classwork_id: number;
  comment: string;
  student_id: number;
  created_at: string; // or Date
}

@Injectable({
  providedIn: 'root'
})
export class ClassworkSubmissionRepoService extends CrudRepo<ClassworkSubmission> {

  constructor(http: HttpClient) {
    super(http, "curriculum", "classwork-submissions");
  }
}
