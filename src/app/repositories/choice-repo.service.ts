import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type Choice = {
  id: number;
  answer_text: string;
  question_id: number;

  is_correct: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class ChoicesRepoService extends CrudRepo<Choice> {

  constructor(http: HttpClient) {
    super(http, "curriculum", "choices");
  }
}
