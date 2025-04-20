import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type SubjectTopic = {
  id: number;
  title: string;
  description?: string;
  teacher_subject_id: number,
  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class SubjectTopicService extends CrudRepo<SubjectTopic> {

  constructor(http: HttpClient) {
    super(http, "subject-management", "subject-topics");
  }
}
