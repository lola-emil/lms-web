import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentAnswer } from './student-answer-repo.service';

export interface QuizSession {
  id: number;
  student_id: number;

  quiz_id: number,
  score: number,
  hps: number,

  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizSessionRepoService extends CrudRepo<QuizSession> {


  constructor(http: HttpClient) {
    super(http, "curriculum", "quiz-sessions");
  }

}
