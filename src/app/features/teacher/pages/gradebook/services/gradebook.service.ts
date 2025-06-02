import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


export type TeacherSubject = {
  id: number;
  subject: {
    title: string;
  };
};

export type StudentGrade = {
  id: number;
  studentId: number;
  teacherSubjectId: number;
  category: "QUIZ" | "ACTIVITY" | "EXAM";
  title: string;
  hps: number; // Highest possible score
  score: number;
  createdAt: string;
  updatedAt: string;

  student: {
    firstname: string;
    middlename?: string;
    lastname: string;
  };
};

export type GradeSummary = {
  studentName: string;
  quizAverage: number;
  activityAverage: number;
  examAverage: number;
  finalGrade: number;
};

export type GradeWeights = {
  QUIZ?: number;      // default: 0.3
  ACTIVITY?: number;  // default: 0.7
  EXAM?: number;
};

export type TeacherSubjectSection = {
  id: number;
  teacherSubjectId: number;
  classSectionId: number;
  createdAt: string;
  updatedAt: string;
  classSection: {
    id: number;
    sectionName: string;
    classLevelId: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type Student = {
  id: string;
  email: string;
  firstname: string;
  middlename: string | null;
  lastname: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  studentGrades: StudentGrade[];
};

export type StudentEnrolledSection = {
  id: string;
  studentId: string;
  classSectionId: string;
  schoolYearId: string;
  createdAt: string;
  updatedAt: string;
  student: Student;
};

@Injectable({
  providedIn: 'root'
})
export class GradebookService {

  constructor(
    private apollo: Apollo
  ) { }


  getSections(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ teacherSubjectSectionsPerTeacher: TeacherSubjectSection[]; }>({
      query: gql`
        query TeacherSubjectSectionsPerTeacher {
            teacherSubjectSectionsPerTeacher(teacherSubjectId: ${teacherSubjectId}) {
                id
                teacherSubjectId
                classSectionId
                createdAt
                updatedAt
                classSection {
                  id
                  sectionName
                  classLevelId
                  createdAt
                  updatedAt
              }
            }
        }
      `,
      fetchPolicy: "no-cache"

    }).valueChanges;
  }

  getStudents(sectionId: number, teacherSubjectId: number) {
    return this.apollo.watchQuery<{ studentEnrolledSections: StudentEnrolledSection[]; }>({
      query: gql`
        query StudentEnrolledSections {
            studentEnrolledSections(sectionId: ${sectionId}) {
                id
                studentId
                classSectionId
                schoolYearId
                createdAt
                updatedAt
                student {
                    id
                    email
                    firstname
                    middlename
                    lastname
                    role
                    createdAt
                    updatedAt
                    studentGrades(teacherSubjectId: ${teacherSubjectId}) {
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
                }
            }
        }
      `,
      fetchPolicy: "no-cache"

    }).valueChanges;
  }

  getGradesByTeacherSubjectId(teacherSubjectId: number) {

    return this.apollo.watchQuery<{ gradePerSubject: StudentGrade[]; }>({
      query: gql`
        query GradePerSubject {
            gradePerSubject(teacherSubjectId: ${teacherSubjectId}) {
                id
                studentId
                teacherSubjectId
                category
                title
                hps
                score
                createdAt
                updatedAt
                student {
                  firstname
                  middlename
                  lastname
              }
            }
        }
      `,
      fetchPolicy: "no-cache"

    }).valueChanges;
  }

  getTeacherSubjects(teacherId: number) {
    return this.apollo.watchQuery<{ teacherSubjectsPerTeacher: TeacherSubject[]; }>({
      query: gql`
        query TeacherSubject {
          teacherSubjectsPerTeacher(teacherId: ${teacherId}) {
            id
            subject {
              title
            }
          }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }


  computeGradeSummary(
    data: { studentEnrolledSections: StudentEnrolledSection[]; }
  ): GradeSummary[] {
    return data.studentEnrolledSections.map((section) => {
      const { firstname, middlename, lastname, studentGrades } = section.student;
      const studentName = `${firstname} ${middlename ?? ''} ${lastname}`.trim();

      let quizScore = 0, quizHps = 0;
      let activityScore = 0, activityHps = 0;
      let examScore = 0, examHps = 0;

      for (const grade of studentGrades) {
        switch (grade.category.toLowerCase()) {
          case 'quiz':
            quizScore += grade.score;
            quizHps += grade.hps;
            break;
          case 'activity':
            activityScore += grade.score;
            activityHps += grade.hps;
            break;
          case 'exam':
            examScore += grade.score;
            examHps += grade.hps;
            break;
        }
      }

      const quizAverage = quizHps ? (quizScore / quizHps) * 100 : 0;
      const activityAverage = activityHps ? (activityScore / activityHps) * 100 : 0;
      const examAverage = examHps ? (examScore / examHps) * 100 : 0;

      // Weighted final grade
      const finalGrade =
        quizAverage * 0.2 +
        activityAverage * 0.6 +
        examAverage * 0.2;

      return {
        studentName,
        quizAverage: parseFloat(quizAverage.toFixed(2)),
        activityAverage: parseFloat(activityAverage.toFixed(2)),
        examAverage: parseFloat(examAverage.toFixed(2)),
        finalGrade: parseFloat(finalGrade.toFixed(2)),
      };
    });
  }
}
