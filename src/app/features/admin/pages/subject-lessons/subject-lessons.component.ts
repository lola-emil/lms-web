import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Subject, SubjectDetailService } from '../subject-detail-page/services/subject-detail.service';

@Component({
  selector: 'app-subject-lessons',
  imports: [CommonModule, RouterLink],
  templateUrl: './subject-lessons.component.html',
  styles: ``
})
export class SubjectLessonsComponent {
  subjectId?: number;
  subjectDetail: Subject | null = null;

  constructor(
    private route: ActivatedRoute,
    private subjectDetailService: SubjectDetailService
  ) {
    this.route.parent?.params.subscribe(val => this.subjectId = parseInt(val['id']));
  }

  ngOnInit(): void {
    this.subjectDetailService.getSubjectDetail(this.subjectId ?? 0)
      .subscribe(val => {
        this.subjectDetail = val.data.subject;
      });
  }
}
