import { Injectable } from '@angular/core';
import { Subject, SubjectRepoService } from '../../../repositories/subject-repo.service';
import { GradeLevel, GradeLevelRepoService } from '../../../repositories/grade-level-repo.service';
import { StudentLevelRepoService } from '../../../repositories/student-level-repo.service';
import { TeacherSubjectRepoService } from '../../../repositories/teacher-subject-repo.service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { GradeSection, GradeSectionRepoService } from '../../../repositories/grade-section-repo.service';
import { Lesson, LessonRepoService } from '../../../repositories/lesson-repo.service';
import { TopicRepoService } from '../../../repositories/topic-repo.service';


export type SubjectListItem = {
  subject: Subject,
  level: GradeLevel,
  section: GradeSection;
};

export type SubjectDetail = {
  subject: Subject;
  level?: GradeLevel;
  topics: Array<{
    id: number;
    title: string;
    lessons: Lesson[]; // or use your Lesson type
  }>;
};

@Injectable({
  providedIn: 'root'
})
export class SubjectListServiceService {

  constructor(
    private teacherSubjectRepo: TeacherSubjectRepoService,
    private subjectRepo: SubjectRepoService,
    private gradeLevelRepo: GradeLevelRepoService,
    private studentLevelRepo: StudentLevelRepoService,
    private topicRepo: TopicRepoService,
    private lessonRepo: LessonRepoService,
    private gradeSectionRepo: GradeSectionRepoService
  ) { }

  getSubjectList(opt?: { limit?: number; offset?: number; }): Observable<Partial<SubjectListItem>[]> {
    return this.teacherSubjectRepo.get({
      limit: opt?.limit,
      offset: opt?.offset
    }).pipe(
      switchMap((teacherSubjects) => {
        const subjectIds = teacherSubjects.map(val => val.subject_id);
        const levelIds = teacherSubjects.map(val => val.grade_level_id);
        const sectionIds = teacherSubjects.map(val => val.grade_section_id);

        return forkJoin({
          teacherSubjects: of(teacherSubjects),
          subjects: this.subjectRepo.get({ id: subjectIds }),
          grade_levels: this.gradeLevelRepo.get({ id: levelIds }),
          grade_sections: this.gradeSectionRepo.get({ id: sectionIds })
        });
      }),
      // Transform everything into the desired format
      map(({ teacherSubjects, subjects, grade_levels, grade_sections }) => {
        return teacherSubjects.map(teacherSubject => {
          const subject = subjects.find(s => s.id === teacherSubject.subject_id);
          const level = grade_levels.find(l => l.id === teacherSubject.grade_level_id);
          const section = grade_sections.find(sec => sec.id === teacherSubject.grade_section_id);

          return { subject, level, section };
        });
      })
    );
  }




  getSubjectDetail(id: number): Observable<SubjectDetail> {
    return this.subjectRepo.get({ id: [id] }).pipe(
      switchMap(subjects => {
        const subject = subjects[0];
        if (!subject) throw new Error('Subject not found');

        return forkJoin({
          subject: of(subject),
          level: this.gradeLevelRepo.get({ id: [subject.grade_level_id] }).pipe(
            map(levels => levels[0])
          ),
          topics: this.topicRepo.get({ subject_id: [subject.id] })
        });
      }),
      switchMap(({ subject, level, topics }) => {
        if (!topics.length) {
          return of({
            subject,
            level,
            topics: [] // return empty topics array
          } as SubjectDetail);
        }

        const topicLessonRequests: Observable<SubjectDetail['topics'][0]>[] = topics.map(topic =>
          this.lessonRepo.get({ topic_id: [topic.id] }).pipe(
            map(lessons => ({
              id: topic.id,
              title: topic.title,
              lessons
            }))
          )
        );

        return forkJoin(topicLessonRequests).pipe(
          map(topicsWithLessons => ({
            subject,
            level,
            topics: topicsWithLessons
          }))
        );
      })
    );
  }
}
