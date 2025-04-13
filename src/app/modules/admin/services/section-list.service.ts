import { Injectable } from '@angular/core';
import { GradeLevel, GradeLevelRepoService } from '../../../repositories/grade-level-repo.service';
import { GradeSection, GradeSectionRepoService } from '../../../repositories/grade-section-repo.service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

export type SectionListItem = {
  level?: GradeLevel,
  section: GradeSection;
};

@Injectable({
  providedIn: 'root'
})
export class SectionListService {

  constructor(
    private gradeLevelRepo: GradeLevelRepoService,
    private gradeSectionRepo: GradeSectionRepoService
  ) { }

  getSectionList(opt?: { limit?: number, offset?: number; }): Observable<SectionListItem[]> {
    return this.gradeSectionRepo.get({
      limit: opt?.limit,
      offset: opt?.offset
    }).pipe(
      switchMap(sections => {
        const levelIds = sections.map(s => s.grade_level_id);
        return forkJoin({
          sections: of(sections),
          grade_levels: this.gradeLevelRepo.get({ id: levelIds })
        });
      }),
      map(val => {
        return (<GradeSection[]>val.sections).map(section => {
          const level = val.grade_levels.find(gl => gl.id === section.grade_level_id);

          return {
            section,
            level
          };
        });
      })
    );
  }
}
