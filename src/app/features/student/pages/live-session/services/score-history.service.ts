import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type StudentGrade = {
  id: number;
  title?: string;
  score: number;
  hps: number;
  category: "QUIZ" | "ACTIVITY",
  createdAt: string;
  teacherSubject: {
    subject: {
      id: number;
      title: string;
    };
  };
};

@Injectable({
  providedIn: 'root'
})
export class ScoreHistoryService {

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) { }

  getScores(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ gradePerSubject: StudentGrade[]; }>({
      query: gql`
        query StudentGrades {
             gradePerSubject(teacherSubjectId: ${teacherSubjectId}) {
                id
                score
                title
                hps
                category
                createdAt
                teacherSubject {
                    subject {
                        id
                        title
                    }
                }
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  getTeacherId(studentSubjectId: number) {

  }
}
