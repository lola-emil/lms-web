import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


export type Submission = {
  id: number;
  title: string;
  comment: string;
  studentId: number;
  attachments: Attachment[];
  student: {
    id: number;
    email: string;
    firstname: string;
    middlename?: string;
    lastname: string;
  };
};

export type Attachment = {
  id: number;
  fileURL: string;
};

export type Classwork = {
  id: number;
  title: string;
  instructions: string;
  teacherSubjectId: number;
  dueDate?: string;

  createdAt: string;

  assignmentSubmissions: Submission[];
};

@Injectable({
  providedIn: 'root'
})
export class ClassworkService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getClassworks(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ assignments: Classwork[]; }>({
      query: gql`
          query Assignments {
            assignments(teacherSubjectId: ${teacherSubjectId}) {
                id
                title
                instructions
                teacherAssignedSubjectId
                dueDate
                createdAt
                assignmentSubmissions {
                  id
                  title
                  comment
                  assignmentId
                  createdAt
                  attachments {
                    id
                    fileURL
                  }
                  student {
                    id
                    email
                    firstname
                    middlename
                    lastname
                  }
                }
            }
          }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  createClasswork(data: Partial<{
    title: string;
    teacherAssignedSubjectId: number;
    instructions: string;
    dueDate: string;
    hps: number;
  }>) {
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateAssignment(
        $title: String!,
        $teacherAssignedSubjectId: Int!,
        $instructions: String,
        $dueDate: DateTime,
        $hps: Float
      ) {
        createAssignment(
          title: $title,
          teacherAssignedSubjectId: $teacherAssignedSubjectId,
          instructions: $instructions,
          dueDate: $dueDate,
          hps: $hps
        ) {
          id
          title
          instructions
          teacherAssignedSubjectId
          dueDate
          createdAt
          updatedAt
        }
      }
    `,
      variables: {
        title: data.title,
        teacherAssignedSubjectId: data.teacherAssignedSubjectId,
        instructions: data.instructions,
        dueDate: data.dueDate,
        hps: data.hps
      }
    });
  }
}
