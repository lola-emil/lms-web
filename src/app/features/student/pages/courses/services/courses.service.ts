import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';


export type StudentSubject = {
  id: number;
  teacherSubject: {
    id: number;
    subject: {
      id: number;
      title: string;
      coverImgUrl?: string;
    },
    teacher: {
      firstname: string;
      lastname: string;
    };
  };
};

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private readonly apollo: Apollo,
    private authService: AuthService
  ) { }

  getEnrolledSubjects() {
    const userDetail = this.authService.getUserDetail();
    return this.apollo.watchQuery<{ enrolledSubjectsByStudentId: StudentSubject[]; }>({
      query: gql`
        query EnrolledSubjectsByStudentId {
            enrolledSubjectsByStudentId(studentId: ${userDetail.id}) {
                id
                teacherSubject {
                    id
                    subject {
                        id
                        title
                        coverImgUrl
                        createdAt
                    }
                    teacher {
                        firstname
                        lastname
                    }
                }
            }
        }
        `
    }).valueChanges;
  }
}
