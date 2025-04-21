import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type Answer = {
  id: number;
  answer_text: string;
  question_id: number;

  is_correct: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class AnswersService extends CrudRepo<Answer> {

  constructor(http: HttpClient) {
    super(http, "curriculum", "answers");
  }
}
