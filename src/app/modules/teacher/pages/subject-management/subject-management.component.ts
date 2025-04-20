import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerLayoutComponent } from "../../fragments/drawer-layout/drawer-layout.component";
import { RouterLink } from '@angular/router';
import { TeacherSubjectRepoService } from '../../../../repositories/teacher-subject-repo.service';
import { Subscription, tap } from 'rxjs';
import { SubjectListItem, SubjectListServiceService } from '../../services/subject-list-service.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-subject-management',
  imports: [DrawerLayoutComponent, RouterLink],
  templateUrl: './subject-management.component.html',
  styles: ``
})
export class SubjectManagementComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  subjects: Partial<SubjectListItem>[] = [];
  subjectsCount = 0;
  page = 1;
  limit = 10;
  maxPage = 1;

  constructor(
    private teacherSubjectRepo: TeacherSubjectRepoService,
    private subjectListService: SubjectListServiceService,
    private authService: AuthService
  ) {
  }

  nextPage() {
    this.page += 1;
  }
  prevPage() {
    this.page -= 1;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.teacherSubjectRepo.count({
        teacher_id: this.authService.getUserDetail().user_id
      })
        .subscribe(val => this.subjectsCount = val.count),
    );

    this.updateSubjectList();
  }

  updateSubjectList() {

    this.subscriptions.push(
      this.subjectListService.getSubjectList()
        .pipe(
          tap(val => {
            this.subjects = val;
          })
        ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
