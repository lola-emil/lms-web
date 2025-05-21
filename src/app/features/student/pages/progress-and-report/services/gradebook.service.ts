import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type StudentGrade = {
  id: number,
  category: "QUIZ" | "ACTIVITY",
  score: number;
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
export class GradebookService {

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) { }

  getGrades() {
    const user = this.authService.getUserDetail();

    return this.apollo.watchQuery<{ studentGrades: StudentGrade[]; }>({
      query: gql`
        query StudentGrades {
            studentGrades(studentId: ${user.id}) {
                id
                category
                score
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
}
