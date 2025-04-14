import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";
import { ModalService } from '../../../../ui/modal/modal.service';
import { DrawerService } from '../../../../layout/main-layout/drawer.service';
import { MainLayoutComponent } from "../../../../layout/main-layout/main-layout.component";
import { SubjectContentFormComponent } from '../../fragments/subject-content-form/subject-content-form.component';
import { ActivatedRoute } from '@angular/router';
import { SubjectRepoService } from '../../../../repositories/subject-repo.service';
import { SubjectDetail, SubjectListService } from '../../services/subject-list.service';
import { DatePipe } from '@angular/common';
import { catchError, of, Subscription, tap } from 'rxjs';
import { UserProfile, UserProfileRepoService } from '../../../../repositories/user-profile-repo.service';

@Component({
  selector: 'app-subject-details',
  imports: [AdminLayoutComponent, MainLayoutComponent, DatePipe],
  templateUrl: './subject-details.component.html',
  styles: ``
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  subjectId!: number;
  subjectDetail?: SubjectDetail;

  enrolledTeachers: UserProfile[] = [];

  constructor(
    private drawerService: DrawerService,
    private route: ActivatedRoute,
    private subjectListService: SubjectListService,
    private userProfileRepo: UserProfileRepoService
  ) {
    this.route.paramMap.subscribe(val => this.subjectId = parseInt(val.get("id") ?? "i"));
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.subjectListService.getSubjectDetail(this.subjectId)
        .pipe(
          tap(val => {
            console.log(val);
            this.subjectDetail = val;
          }),
          catchError(err => {
            console.log(err);
            return of(null);
          })
        )
        .subscribe(),


      this.userProfileRepo.get({ limit: 5 })
        .pipe(
          tap(val => {
            this.enrolledTeachers = val;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(val => val.unsubscribe());
  }

  addEditContent() {
    this.drawerService.open(SubjectContentFormComponent);
  }
}
