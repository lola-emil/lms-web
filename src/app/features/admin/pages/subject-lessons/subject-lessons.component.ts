import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Subject, SubjectDetailService } from '../subject-detail-page/services/subject-detail.service';
import { SubjectLessonService } from './services/subject-lesson.service';

@Component({
  selector: 'app-subject-lessons',
  imports: [CommonModule, RouterLink],
  templateUrl: './subject-lessons.component.html',
  styles: ``
})
export class SubjectLessonsComponent {
  subjectId?: number;
  subjectDetail: Subject | null = null;

  @ViewChild("confirmationModal") confirmationModal!: ElementRef<HTMLDialogElement>;

  constructor(
    private route: ActivatedRoute,
    private subjectDetailService: SubjectDetailService,
    private subjectLessonService: SubjectLessonService
  ) {
    this.route.parent?.params.subscribe(val => this.subjectId = parseInt(val['id']));
  }

  ngOnInit(): void {
    this.getMaterials()
  }

  getMaterials() {
    this.subjectDetailService.getSubjectDetail(this.subjectId ?? 0)
      .subscribe(val => {
        this.subjectDetail = val.data.subject;
      });
  }

  selectedId?: number;

  deleteMaterial() {
    this.subjectLessonService.deleteMaterial(this.selectedId ?? 0)
    .subscribe(res => {
        console.log(res);
        this.confirmationModal.nativeElement.close();
        this.getMaterials();
    });
  }

  openDialog(id: number) {
    this.selectedId = id;
    this.confirmationModal.nativeElement.showModal();
  }
}
