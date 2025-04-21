import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type StudentAnswer = {
  id: number;
  quiz_session_id: number;
  question_id: number;
  answer_id: number;
};

@Injectable({
  providedIn: 'root'
})
export class StudentAnswerRepoService extends CrudRepo<StudentAnswer> {

  constructor(http: HttpClient) {
    super(http, "curriculum", "student-answers");
  }

}
