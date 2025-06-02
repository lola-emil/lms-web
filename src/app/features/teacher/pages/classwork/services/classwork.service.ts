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
                teacherSubjectId
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
    teacherSubjectId: number;
    instructions: string;
    dueDate: string;
    hps: number;
  }>) {
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateAssignment(
        $title: String!,
        $teacherSubjectId: Int!,
        $instructions: String,
        $dueDate: DateTime,
        $hps: Float
      ) {
        createAssignment(
          title: $title,
          teacherSubjectId: $teacherSubjectId,
          instructions: $instructions,
          dueDate: $dueDate,
          hps: $hps
        ) {
          id
          title
          instructions
          teacherSubjectId
          dueDate
          createdAt
          updatedAt
        }
      }
    `,
      variables: {
        title: data.title,
        teacherSubjectId: data.teacherSubjectId,
        instructions: data.instructions,
        dueDate: data.dueDate,
        hps: data.hps
      }
    });
  }
}
