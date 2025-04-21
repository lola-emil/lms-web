import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type Question = {
  id: number;
  question_text: string;
  subject_id: number;

  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class QuestionsRepoService extends CrudRepo<Question> {

  constructor(http: HttpClient) {
    super(http, "curriculum", "questions");
  }
}
