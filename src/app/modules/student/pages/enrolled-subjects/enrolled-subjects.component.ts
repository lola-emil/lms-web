import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerLayoutComponent } from "../../fragments/drawer-layout/drawer-layout.component";
import { RouterLink } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { SubjectListItem, SubjectListService } from '../../services/subject-list.service';
import { TeacherSubject, TeacherSubjectRepoService } from '../../../../repositories/teacher-subject-repo.service';

@Component({
  selector: 'app-enrolled-subjects',
  imports: [DrawerLayoutComponent, RouterLink],
  templateUrl: './enrolled-subjects.component.html',
  styles: ``
})
export class EnrolledSubjectsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  subjects: Partial<SubjectListItem>[] = [];

  subjectsCount = 0;
  page = 1;
  limit = 10;
  maxPage = 1;

  constructor(
    private subjectListService: SubjectListService,
    private teacherSubjectRepo: TeacherSubjectRepoService
  ) {

  }


  updateSubjectList() {
    this.subscriptions.push(
      this.teacherSubjectRepo.count({
        grade_level_id: 1,
        grade_section_id: 1,
        school_year_id: 1
      }).subscribe(val => this.subjectsCount = val.count),

      this.subjectListService.getSubjectList()
        .pipe(
          tap(val => {
            console.log(val);
            this.subjects = val;
          })
        ).subscribe()
    );
  }

  ngOnInit(): void {
    this.updateSubjectList();

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
