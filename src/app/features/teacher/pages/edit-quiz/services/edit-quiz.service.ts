import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';

type Question = {
  id: number;
  questionText: string;
  type: QuestionType;
  answers: {
    id: number;
    answerText: string;
    isCorrect: boolean;
  }[];
};

export type Quiz = {
  id: number;
  title: string;
  teacherSubjectId: number;
  questions: Question[];
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
export class EditQuizService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getQuiz(id: number) {
    return this.apollo.watchQuery<{ subjectMaterial: Quiz; }>({
      query: gql`
        query StudentEnrolledSubjects {
            subjectMaterial(id: ${id}) {
                id
                title
                materialType
                content
                teacherSubjectId
                createdAt
                updatedAt
                questions {
                    id
                    questionText
                    type
                    subjectMaterialId
                    answers {
                        id
                        answerText
                        questionId
                        isCorrect
                    }
                }
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  editQuiz(body: Quiz) {
    return this.http.post(`${environment.apiURL}/graphql-ext/edit-quiz`, body);
  }
}
