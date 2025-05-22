import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

type User = {
  firstname: string;
  lastname: string;
  role: "ADMIN" | "STUDENT" | "TEACHER";
};

type Comment = {
  commentText: string;
  createdAt: string;
  updatedAt: string;
  replies: Comment[],
  createdBy: User;
};

export type ForumDiscussion = {
  id: number;
  title: string;
  query: string;
  createdBy: User;
  forumComments: Comment[];

  createdAt: string;
};

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(
    private readonly apollo: Apollo,
    private authService: AuthService
  ) { }


  getStudentEnrolledSubject(studentSubjectId: number) {
    return this.apollo.watchQuery<{studentEnrolledSubject: {teacherSubjectId: number}}>({
      query: gql`
        query EnrolledSubjectsByStudentId {
            studentEnrolledSubject(id: ${studentSubjectId}) {
                id
                studentId
                teacherSubjectId
                createdAt
                updatedAt
            }
        }
      `
    }).valueChanges;
  }

  getAnnouncements(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ forumDiscussions: ForumDiscussion[]; }>({
      query: gql`
        query ForumDiscussions {
            forumDiscussions(teacherSubjectId: ${teacherSubjectId}) {
                id
                title
                query
                createdById
                createdAt
                updatedAt
                forumComments {
                    id
                    commentText
                    createdAt
                    updatedAt
                    createdById
                    replies {
                        id
                        commentText
                        createdAt
                        updatedAt
                        createdById
                        createdBy {
                            id
                            email
                            firstname
                            middlename
                            lastname
                            role
                            createdAt
                            updatedAt
                        }
                    }
                    createdBy {
                        id
                        email
                        firstname
                        middlename
                        lastname
                        role
                        createdAt
                        updatedAt
                    }
                }
                createdBy {
                    id
                    email
                    firstname
                    middlename
                    lastname
                    role
                    createdAt
                    updatedAt
                }
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  postAnnouncement(body: Partial<{
    title: string | null;
    query: string | null;
    teacherSubjectId: number,
  }>) {
    const userDetail = this.authService.getUserDetail();
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateForumDiscussion(
          $title: String,
          $query: String,
          $teacherSubjectId: Int!,
          $createdById: Int!
        ) {
            createForumDiscussion(
                teacherSubjectId: $teacherSubjectId
                createdById: $createdById
                title: $title
                query: $query
            ) {
                id
                title
                query
                createdById
                createdAt
                updatedAt
            }
        }

      `,
      variables: {
        ...body,
        createdById: userDetail.id
      }
    });
  }


  addReply(body: {
    forumDiscussionId: number;
    commentText: string;
    createdById: number;
    parentCommentId?: number;
  }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddComment(
          $forumDiscussionId: Int!,
          $commentText: String!,
          $createdById: Int!
        ) {
            addComment(forumDiscussionId: $forumDiscussionId, commentText: $commentText, createdById: $createdById) {
                id
                commentText
                createdAt
                updatedAt
                createdById
            }
        }
      `,
      variables: body
    });
  }
}
