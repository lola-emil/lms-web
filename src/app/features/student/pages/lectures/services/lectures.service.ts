import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type TeacherAssignedSubjectResponse = {
  teacherAssignedSubject: {
    id: string;
    teacher: {
      firstname: string;
      middlename: string;
      lastname: string;
    };
    subject: {
      title: string;
      coverImgUrl: string;
      subjectMaterials: {
        id: string;
        materialType: "DOCUMENT" | "QUIZ" | "MD"
        fileURL?: string;
        description: string;
        createdAt: string;
        updatedAt: string;
      }[];
    };
  };
};

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getMaterials(teacherSubjectId: number) {
    return this.apollo.watchQuery<TeacherAssignedSubjectResponse>({
      query: gql`
        query TeacherAssignedSubject {
            teacherAssignedSubject(id: ${teacherSubjectId}) {
                id
                teacher {
                    firstname
                    middlename
                    lastname
                }
                subject {
                    title
                    coverImgUrl
                    subjectMaterials {
                        id
                        description
                        materialType
                        fileURL
                        createdAt
                        updatedAt
                    }
                }
            }
        }
      `
    }).valueChanges
  }
}
