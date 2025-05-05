import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type EnrolledSubjectsByStudentIdResponse = {
  enrolledSubjectsByStudentId: {
    teacherSubject: {
      id: string;
      schoolYearId: string;
      teacher: {
        firstname: string;
        middlename: string;
        lastname: string;
      };
      subject: {
        id: string;
        title: string;
        coverImgUrl: string;
      };
    };
  }[];
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
    return this.apollo.watchQuery<EnrolledSubjectsByStudentIdResponse>({
      query: gql`
        query EnrolledSubjectsByStudentId {
            enrolledSubjectsByStudentId(studentId: ${userDetail.id}) {
                teacherSubject {
                    id
                    schoolYearId
                    teacher {
                        firstname
                        middlename
                        lastname
                    }
                    subject {
                        title
                        coverImgUrl
                        id
                    }
                }
            }
        }
        `
    }).valueChanges;
  }
}
