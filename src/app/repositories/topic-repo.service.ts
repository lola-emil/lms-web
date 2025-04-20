import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type Topic = {
  id: number;
  title: string;
  description?: string;
  subject_id: number,
  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class TopicRepoService extends CrudRepo<Topic> {

  constructor(http: HttpClient) {
    super(http, "subject-management", "topics");
  }
}
