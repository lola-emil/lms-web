import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type EnrolledSubjectsByStudentIdResponse = {
  enrolledSubjectsByStudentId: {
    id: string;
    teacherSubject: {
      id: string;
      subject: {
        id: string;
        title: string;
        coverImgUrl: string;
      };
      teacher: {
        firstname: string;
        middlename: string;
        lastname: string;
        role: string;
      };
    };
  }[];
};


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private readonly apollo: Apollo,
    private authService: AuthService
  ) { }

  getEnrolledSubjects() {
    const userDetails = this.authService.getUserDetail();

    return this.apollo.watchQuery<EnrolledSubjectsByStudentIdResponse>({
      query: gql`
            query EnrolledSubjectsByStudentId {
              enrolledSubjectsByStudentId(studentId: ${userDetails.id}) {
                  id
                  teacherSubject {
                      subject {
                          id
                          title
                          coverImgUrl
                      }
                      teacher {
                          firstname
                          middlename
                          lastname
                          role
                      }
                      id
                  }
              }
          }
          `
    }).valueChanges;
  }
}
