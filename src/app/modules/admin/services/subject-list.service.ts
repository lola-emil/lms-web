import { Injectable } from '@angular/core';
import { Subject, SubjectRepoService } from '../../../repositories/subject-repo.service';
import { TopicRepoService } from '../../../repositories/topic-repo.service';
import { Lesson, LessonRepoService } from '../../../repositories/lesson-repo.service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { GradeLevel, GradeLevelRepoService } from '../../../repositories/grade-level-repo.service';
import { GradeSection } from '../../../repositories/grade-section-repo.service';

export type SubjectListItem = {
  level?: GradeLevel,
  subject: Subject;
  lesson_count: { count: number; };
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
export class SubjectListService {

  constructor(
    private subjectRepo: SubjectRepoService,
    private topicRepo: TopicRepoService,
    private lessonRepo: LessonRepoService,
    private gradeLevelRepo: GradeLevelRepoService
  ) { }

  getSubjectList(opt?: { limit?: number; offset?: number; }): Observable<SubjectListItem[]> {
    return this.subjectRepo.get({
      limit: opt?.limit,
      offset: opt?.offset
    }).pipe(
      switchMap(subjects => {
        const levelIds = subjects.map(val => val.grade_level_id);
        const subjectIds = subjects.map(val => val.id);

        return forkJoin({
          subjects: of(subjects),
          grade_levels: this.gradeLevelRepo.get({ id: levelIds }),
          topics: this.topicRepo.get({ subject_id: subjectIds })
        });
      }),
      switchMap(val => {
        const { subjects, grade_levels, topics } = val;

        // Group topics by subject_id
        const subjectTopicMap: { [subjectId: number]: number[]; } = {};
        for (const topic of topics) {
          if (!subjectTopicMap[topic.subject_id]) {
            subjectTopicMap[topic.subject_id] = [];
          }
          subjectTopicMap[topic.subject_id].push(topic.id);
        }

        // For each subject, get lesson count
        const items$ = subjects.map(subject => {
          const level = grade_levels.find(gl => gl.id === subject.grade_level_id);
          const topicIds = subjectTopicMap[subject.id] ?? [];

          return this.lessonRepo.count({ topic_id: topicIds }).pipe(
            map(lesson_count => ({
              subject,
              level,
              lesson_count
            }))
          );
        });

        // Wait for all lesson counts to resolve
        return forkJoin(items$);
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
