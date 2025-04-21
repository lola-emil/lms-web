import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentAnswer } from './student-answer-repo.service';

export type QuizSession = {
  id: number;
  quiz_id: number;
  student_id: number;

  expires_at: string;

  created_at: string;
  updated_at: string;
};


@Injectable({
  providedIn: 'root'
})
export class QuizSessionRepoService extends CrudRepo<QuizSession> {


  constructor(http: HttpClient) {
    super(http, "curriculum", "quiz-sessions");
  }


  finishSession(studentAnswers: Partial<StudentAnswer>[],sessionId: number): Observable<QuizSession> {
    return this.http.post<QuizSession>(
      `${this.apiURL}/curriculum/quiz-sessions/finish-session`, // Your endpoint: POST /api/curriculum/quiz-sessions/finish
      {
        student_answers: studentAnswers,
        session_id: sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );
  }
}
