import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Quiz = {
  id: number;
  title: string;
  questions: {
    id: number;
    questionText: string;
    type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER",
    answers: { id: number; answerText: string; }[];
  }[];
};

@Injectable({
  providedIn: 'root'
})
export class QuizPageService {

  constructor(
    private readonly apollo: Apollo,
    private http: HttpClient
  ) { }

  getQuiz(id: number) {
    return this.apollo.watchQuery<{ quiz: Quiz; }>({
      query: gql`
        query Quiz {
            quiz(id: ${id}) {
                id
                title
                questions {
                    id
                    questionText
                    type
                    answers {
                        id
                        answerText
                    }
                }
            }
        }
      `
    }).valueChanges;
  }

  finishQuiz(body: {
    id: number;
    studentId: number;
    teacherSubjectId: number;
    answers: {
      id: number;
      answer: any;
    }[];
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/finish-quiz`, body);
  }
}
