import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SubjectListService } from '../../services/subject-list.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-subject-detail',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './subject-detail.component.html',
  styles: ``
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private subjectId: string | null = null;

  subjectName = "";
  subjectCode: string | null = "";
  gradeLevel = "";

  constructor(
    private subjectListService: SubjectListService,
    private route: ActivatedRoute,
  ) {

    this.route.paramMap.subscribe(param => {
      this.subjectId = param.get("id");
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.subjectListService.getSubjectDetail(parseInt(this.subjectId ?? ""))
        .pipe(
          tap(val => {
            this.subjectName = val.subject.subject_name;
            this.subjectCode = val.subject.subject_code;
            this.gradeLevel = val.level?.level + "";
          })
        )
        .subscribe());
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(val => val.unsubscribe());
  }


}
