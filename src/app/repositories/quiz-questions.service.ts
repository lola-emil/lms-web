import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type QuizQuestion = {
  id: number;
  quiz_id: number;
  question_id: number;

  question_order: number;
};

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsService extends CrudRepo<QuizQuestion> {


  constructor(http: HttpClient) {
    super(http, "curriculum", "quiz-questions");
  }


}
