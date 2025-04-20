import { Injectable } from '@angular/core';
import { SubjectMaterialRepoService } from '../../../repositories/subject-material-repo.service';
import { SubjectTopicService } from '../../../repositories/subject-topic.service';
import { switchMap, forkJoin, of, map } from 'rxjs';
import { TopicItem } from '../../teacher/services/topic-list.service';

@Injectable({
  providedIn: 'root'
})
export class TopicListService {

  constructor(
    private subjectTopicRepo: SubjectTopicService,
    private subjectMaterialRepo: SubjectMaterialRepoService
  ) { }


  getTopicList(teacherSubjectId: string, opt?: { limit?: number; offset?: number; }) {
    return this.subjectTopicRepo.get({
      limit: opt?.limit,
      offset: opt?.offset,
      teacher_subject_id: parseInt(teacherSubjectId)
    }).pipe(
      switchMap((subjectTopics) => {
        const topicIds = subjectTopics.map(val => val.id);

        return forkJoin({
          topics: of(subjectTopics),
          subjectMaterials: this.subjectMaterialRepo.get({
            subject_topic_id: topicIds
          })
        });
      }),
      map(({ topics, subjectMaterials }) => {
        return topics.map(topic => {
          const materials = subjectMaterials.filter(mat => mat.subject_topic_id === topic.id);
          return {
            topic,
            subjectMaterials: materials
          } as TopicItem;
        });
      })
    );
  }
}
