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
  category: "QUIZ" | "ACTIVITY";
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
  finalGrade: number;
};

export type GradeWeights = {
  QUIZ?: number;      // default: 0.3
  ACTIVITY?: number;  // default: 0.7
};

@Injectable({
  providedIn: 'root'
})
export class GradebookService {

  constructor(
    private apollo: Apollo
  ) { }

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
      `
    }).valueChanges;
  }

  getTeacherSubjects(teacherId: number) {
    return this.apollo.watchQuery<{ teacherAssignedSubjectsByTeacherId: TeacherSubject[]; }>({
      query: gql`
        query TeacherAssignedSubject {
          teacherAssignedSubjectsByTeacherId(teacherId: ${teacherId}) {
            id
            subject {
              title
            }
          }
        }
      `
    }).valueChanges;
  }

  computeStudentGrade(
    data: StudentGrade[],
    weights: GradeWeights = { QUIZ: 0.3, ACTIVITY: 0.7 }
  ): GradeSummary[] {
    const groupedByStudent = new Map<string, StudentGrade[]>();

    // Group grades by full student name
    data.forEach((grade) => {
      const { firstname, middlename, lastname } = grade.student;
      const fullName = [firstname, middlename, lastname].filter(Boolean).join(" ");

      if (!groupedByStudent.has(fullName)) {
        groupedByStudent.set(fullName, []);
      }
      groupedByStudent.get(fullName)!.push(grade);
    });

    const summaries: GradeSummary[] = [];

    groupedByStudent.forEach((grades, studentName) => {
      let quizScore = 0;
      let quizHps = 0;
      let activityScore = 0;
      let activityHps = 0;

      grades.forEach((grade) => {
        if (grade.category === "QUIZ") {
          quizScore += grade.score;
          quizHps += grade.hps;
        } else if (grade.category === "ACTIVITY") {
          activityScore += grade.score;
          activityHps += grade.hps;
        }
      });

      const quizAverage = quizHps > 0 ? (quizScore / quizHps) * 100 : 0;
      const activityAverage = activityHps > 0 ? (activityScore / activityHps) * 100 : 0;

      const finalGrade =
        (quizAverage * (weights.QUIZ ?? 0.3)) +
        (activityAverage * (weights.ACTIVITY ?? 0.7));

      summaries.push({
        studentName,
        quizAverage: parseFloat(quizAverage.toFixed(2)),
        activityAverage: parseFloat(activityAverage.toFixed(2)),
        finalGrade: parseFloat(finalGrade.toFixed(2)),
      });
    });

    return summaries;
  }
}
