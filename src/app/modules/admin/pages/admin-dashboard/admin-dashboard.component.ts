import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";
import { UserRepoService } from '../../../../repositories/user-repo.service';
import { Subscription } from 'rxjs';
import { GradeSectionRepoService } from '../../../../repositories/grade-section-repo.service';
import { SubjectRepoService } from '../../../../repositories/subject-repo.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminLayoutComponent],
  templateUrl: './admin-dashboard.component.html',
  styles: ``
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];

  userCount: number = 0;
  sectionCount: number = 0;
  subjectCount: number = 0;

  constructor(
    private userRepoService: UserRepoService,
    private gradeSectionRepoService: GradeSectionRepoService,
    private subjectRepoService: SubjectRepoService
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.userRepoService.count()
        .subscribe(val => this.userCount = val.count),
      this.gradeSectionRepoService.count()
      .subscribe(val => this.sectionCount = val.count),
      this.subjectRepoService.count()
      .subscribe(val => this.subjectCount = val.count)
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
