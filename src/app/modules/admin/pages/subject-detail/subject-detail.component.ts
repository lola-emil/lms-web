import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { SubjectListService } from '../../services/subject-list.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GradeLevel, GradeLevelRepoService } from '../../../../repositories/grade-level-repo.service';

@Component({
  selector: 'app-subject-detail',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './subject-detail.component.html',
  styles: ``
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private subjectId: string | null = null;

  gradeLevels: GradeLevel[] = [];

  subjectName = new FormControl("New Subject");
  gradeLevel = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private subjectListService: SubjectListService,
    private gradelevelRepo: GradeLevelRepoService
  ) {
    this.route.paramMap.subscribe(val => {
      this.subjectId = val.get("id");
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.subjectListService.getSubjectDetail(parseInt(this.subjectId ?? ""))
        .pipe(
          tap(val => {
            console.log(val);
            this.subjectName.setValue(val.subject.subject_name);
            this.gradeLevel.setValue(val.level?.id);
          })
        ).subscribe(),


      this.gradelevelRepo.get()
        .subscribe(val => this.gradeLevels = val)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
