import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';

type Question = {
  id: string;
  questionText: string;
  answers: {
    answerText: string;
    correct: boolean;
    type: QuestionType;
  }[];
};

export type TeacherSubject = {
  id: number;
  subject: {
    id: number;
    title: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class QuizCreationService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getSubject(id: number) {
    return this.apollo.watchQuery<{ teacherSubject: TeacherSubject; }>({
      query: gql`
        query TeacherSubject {
            teacherSubject(id: ${id}) {
                id
                subject {
                    id
                    title
                }
            }
        }
      `
    }).valueChanges;
  }

  submitQuiz(data: Question, materialType: "QUIZ" | "EXAM") {
    return this.http.post(`${environment.apiURL}/graphql-ext/create-quiz`, {
      ...data,
      materialType
    });
  }
}
