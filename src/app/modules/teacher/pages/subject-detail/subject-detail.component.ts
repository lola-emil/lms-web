import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GradeLevel, GradeLevelRepoService } from '../../../../repositories/grade-level-repo.service';
import { Subscription, tap } from 'rxjs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SubjectRepoService } from '../../../../repositories/subject-repo.service';
import { SubjectListServiceService } from '../../services/subject-list-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subject-detail',
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './subject-detail.component.html',
  styles: ``
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  private subjectId: string | null = null;

  gradeLevels: GradeLevel[] = [];
  gradeLevel = "";
  subjectName: string | null = null;
  subjectCode: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gradeLevelRepo: GradeLevelRepoService,
    private subjectRepo: SubjectRepoService,
    private gradelevelRepo: GradeLevelRepoService,
    private subjectListService: SubjectListServiceService,

  ) {

    this.route.paramMap.subscribe(param => {
      this.subjectId = param.get("id");
    });
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.gradeLevelRepo.get()
        .subscribe(val => this.gradeLevels = val),

      this.subjectListService.getSubjectDetail(parseInt(this.subjectId ?? ""))
        .pipe(
          tap(val => {
            console.log(val);
            this.subjectName = val.subject.subject_name;
            this.gradeLevel = val.level?.level + "";
            this.subjectCode = val.subject.subject_code;
          })
        ).subscribe(),


      this.gradelevelRepo.get()
        .subscribe(val => this.gradeLevels = val)
    );
  }

  ngOnDestroy(): void {
  }

}
