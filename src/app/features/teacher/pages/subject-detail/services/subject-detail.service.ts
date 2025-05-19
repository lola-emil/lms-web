import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type TeacherAssignedSubject2Response = {
  teacherAssignedSubject: {
    id: string;
    schoolYear: {
      yearStart: string;
      yearEnd: string;
    };
    subject: {
      title: string;
      coverImgUrl: string;
    };
  };
};


@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  constructor(
    private apollo: Apollo
  ) { }

  getSubjectDetail(teacherSubjectId: number) {
    return this.apollo.watchQuery<TeacherAssignedSubject2Response>({
      query: gql`
        query TeacherAssignedSubject2 {
          teacherAssignedSubject(id: ${teacherSubjectId}) {
                id
                schoolYear {
                    yearStart
                    yearEnd
                }
                subject {
                    title
                    coverImgUrl
                }
          }
        }

      `
    }).valueChanges;
  }
}
