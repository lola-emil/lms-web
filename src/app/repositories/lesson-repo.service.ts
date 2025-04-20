import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type Lesson = {
  id: number;
  title: string;
  description: string;
  file_upload: string;

  topic_id: number;

  created_at: string;
  updated_at: string;
};


@Injectable({
  providedIn: 'root'
})
export class LessonRepoService extends CrudRepo<Lesson> {

  constructor(http: HttpClient) {
    super(http, "subject-management", "lessons");
  }
}
