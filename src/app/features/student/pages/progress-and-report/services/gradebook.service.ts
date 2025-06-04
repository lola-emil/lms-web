import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type StudentSection = {
  id: number;
  studentId: number;
  classSectionId: number;
  schoolYearId: number;
  createdAt: string;
  updatedAt: string;
};


export type SubjectSummary = {
  subject: string;
  quiz: number;       // 20%
  assignment: number; // 60%
  exam: number;       // 20%
  total: number;      // Final weighted total
};

export interface Subject {
  id: number;
  title: string;
  coverImgUrl?: string | null;
  classLevelId: number;
  createdAt: string;
  updatedAt: string;
}

export type StudentGrade = {
  id: number;
  studentId: number;
  teacherSubjectId: number;
  category: "EXAM" | "QUIZ" | "ACTIVIY";
  title: string;
  hps: number;
  score: number;
  createdAt: string;
  updatedAt: string;

  teacherSubject: {
    subject: {
      id: number;
      title: string;
    };
  };
};


export interface TeacherSubject {
  id: number;
  subjectId: number;
  teacherId: number;
  schoolYearId: number;
  createdAt: string;
  updatedAt: string;
  studentGrades: StudentGrade[];
  subject: Subject;
}

export interface TeacherSubjectSection {
  id: number;
  teacherSubjectId: number;
  classSectionId: number;
  schoolYearId: number;
  createdAt: string;
  updatedAt: string;
  teacherSubject: TeacherSubject;
}

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



  getSubjects(sectionId: number) {
    const user = this.authService.getUserDetail();
    return this.apollo.watchQuery<{ teacherSubjectSectionsPerSection: TeacherSubjectSection[]; }>({
      query: gql`
query TeacherSubjectSectionsPerSection {
    teacherSubjectSectionsPerSection(sectionId: ${sectionId}) {
        id
        teacherSubjectId
        classSectionId
        schoolYearId
        createdAt
        updatedAt
        teacherSubject {
            id
            subjectId
            teacherId
            schoolYearId
            createdAt
            updatedAt
            studentGrades(studentId: ${user.id}) {
                id
                studentId
                teacherSubjectId
                category
                title
                hps
                score
                createdAt
                updatedAt
            }
            subject {
                id
                title
                coverImgUrl
                classLevelId
                createdAt
                updatedAt
            }
        }
    }
}
        `
    }).valueChanges;
  }

  computeSubjectSummaries(sections: TeacherSubjectSection[]): SubjectSummary[] {
    const summaryMap: Record<string, SubjectSummary> = {};

    // First pass: Initialize all subjects with 0 scores
    for (const section of sections) {
      const subjectTitle = section.teacherSubject.subject.title || "Unknown Subject";
      if (!summaryMap[subjectTitle]) {
        summaryMap[subjectTitle] = {
          subject: subjectTitle,
          quiz: 0,
          assignment: 0,
          exam: 0,
          total: 0,
        };
      }
    }

    // Second pass: Aggregate grades
    for (const section of sections) {
      const { teacherSubject } = section;
      const { studentGrades, subject } = teacherSubject;

      if (!studentGrades || studentGrades.length === 0) continue;

      const subjectTitle = subject.title || "Unknown Subject";

      const categoryTotals = {
        quiz: { score: 0, hps: 0 },
        assignment: { score: 0, hps: 0 },
        exam: { score: 0, hps: 0 },
      };

      for (const grade of studentGrades) {
        if (grade.hps === 0) continue;

        const category = grade.category.toLowerCase();
        if (category === "quiz" || category === "exam" || category === "activity") {
          const mappedCategory = category === "activity" ? "assignment" : category;
          categoryTotals[mappedCategory as keyof typeof categoryTotals].score += grade.score;
          categoryTotals[mappedCategory as keyof typeof categoryTotals].hps += grade.hps;
        }
      }

      const summary = summaryMap[subjectTitle];

      let quizWeighted = 0;
      let assignmentWeighted = 0;
      let examWeighted = 0;

      if (categoryTotals.quiz.hps > 0) {
        quizWeighted = (categoryTotals.quiz.score / categoryTotals.quiz.hps) * 100 * 0.2;
        summary.quiz += quizWeighted;
      }

      if (categoryTotals.assignment.hps > 0) {
        assignmentWeighted = (categoryTotals.assignment.score / categoryTotals.assignment.hps) * 100 * 0.6;
        summary.assignment += assignmentWeighted;
      }

      if (categoryTotals.exam.hps > 0) {
        examWeighted = (categoryTotals.exam.score / categoryTotals.exam.hps) * 100 * 0.2;
        summary.exam += examWeighted;
      }

      summary.total = summary.quiz + summary.assignment + summary.exam;
    }

    return Object.values(summaryMap);
  }

  getEnrolledSection() {
    const user = this.authService.getUserDetail();
    return this.apollo.watchQuery<{ studentCurrentEnrolledSection: StudentSection[]; }>({
      query: gql`
          query StudentEnrolledSections {
              studentCurrentEnrolledSection(studentId: ${user.id}) {
                  id
                  studentId
                  classSectionId
                  schoolYearId
                  createdAt
                  updatedAt
              }
          }
        `
    }).valueChanges;
  }
}
