import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';
import { QuizSession, QuizSessionRepoService } from '../../../../repositories/quiz-session-repo.service';
import { SubjectMaterial, SubjectMaterialRepoService } from '../../../../repositories/subject-material-repo.service';
import { AuthService } from '../../../../services/auth.service';
import { CourseModuleService } from '../../../student/services/course-module.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GradeLevel, GradeLevelRepoService } from '../../../../repositories/grade-level-repo.service';
import { Subject, SubjectDetailService } from './services/subject-detail.service';

@Component({
  selector: 'app-subject-detail-page',
  imports: [DrawerComponent, TopbarComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './subject-detail-page.component.html',
  styles: ``
})
export class SubjectDetailPageComponent implements OnInit {
  lessons$!: Observable<any>;

  @ViewChild("uploadModal") uploadModal!: ElementRef<HTMLDialogElement>;


  mgaLessons: {
    material: SubjectMaterial,
    sessions: QuizSession[];
  }[] = [];

  subjectId: any;

  subjectDetail: Subject | null = null;


  constructor(
    private route: ActivatedRoute,
    private subjectMaterialRepo: SubjectMaterialRepoService,
    private authService: AuthService,
    private subjectDetailService: SubjectDetailService
  ) {
    this.route.params.subscribe(val => this.subjectId = val['id']);
  }

  ngOnInit(): void {
    this.subjectDetailService.getSubjectDetail(this.subjectId)
      .subscribe(val => {
        this.subjectDetail = val.data.subject;
      });
  }


  showModal() {
    this.uploadModal.nativeElement.showModal();
  }

  closeModal() {
    this.uploadModal.nativeElement.close();
  }

  onClose() {
    this.file = null;
  }

  file: File | null = null;
  files: File[] = [];
  title = new FormControl("");

  upload() {
    this.route.params.subscribe(val => {
      const formData = new FormData();
      const userDetail = this.authService.getUserDetail();

      formData.append("created_by", userDetail.id + "");
      formData.append("subject_id", val["id"]);
      formData.append("title", this.title.value + "");

      if (this.file)
        formData.append("moduleFile", this.file);

      this.subjectMaterialRepo.post(formData)
        .subscribe(val => {
          location.reload();
        });
    });
  }


  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  handleFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      this.files.push(fileList[i]);
    }
    console.log('Files:', this.files);
  }


  selectFile(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      this.file = target.files[0];
    }
  }
}
