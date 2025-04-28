import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { Subject, SubjectRepoService } from '../../../../repositories/subject-repo.service';
import { GradeLevel, GradeLevelRepoService } from '../../../../repositories/grade-level-repo.service';

@Component({
  selector: 'app-subject-detail-page',
  imports: [DrawerComponent, TopbarComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './subject-detail-page.component.html',
  styles: ``
})
export class SubjectDetailPageComponent {
  lessons$!: Observable<any>;

  @ViewChild("uploadModal") uploadModal!: ElementRef<HTMLDialogElement>;


  mgaLessons: {
    material: SubjectMaterial,
    sessions: QuizSession[];
  }[] = [];

  subjectId: any;

  subjectDetail: {
    subject: Subject,
    gradeLevel: GradeLevel;
  } | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseModuleService: CourseModuleService,
    private subjectRepo: SubjectRepoService,
    private subjectMaterialRepo: SubjectMaterialRepoService,
    private gradeLevelRepo: GradeLevelRepoService,
    private quizSessionRepo: QuizSessionRepoService,
    private authService: AuthService
  ) {
    this.lessons$ = this.route.parent!.params.pipe(
      map(param => param['id']),
      switchMap(courseId => this.courseModuleService.getByCourseId(courseId)),
      map(response => (response as any).data)
    );

    this.route.params.subscribe(param => {
      this.subjectRepo.get({
        id: param["id"]
      }).pipe(
        switchMap(subjects => {
          const gradeLevelIds = subjects.map(val => val.class_level_id);
          return forkJoin({
            subjects: of(subjects),
            gradeLevel: gradeLevelRepo.get({ id: gradeLevelIds })
          });
        })
      ).subscribe(val => {
        this.subjectDetail = {
          subject: val.subjects[0],
          gradeLevel: val.gradeLevel[0]
        };
      });
    });

    this.route.params.subscribe(
      val => {
        this.subjectId = val['id'];

        console.log(val["id"]);

        this.subjectMaterialRepo.get({
          subject_id: val['id']
        })
          .pipe(
            switchMap(materials => {
              const subjectMaterialIds = materials.map(val => val.id);

              return forkJoin({
                subjectMaterials: of(materials),
                quizSession: this.quizSessionRepo.get(
                  {
                    quiz_id: subjectMaterialIds,
                    student_id: this.authService.getUserDetail().user_id
                  }
                )
              });
            })
          )
          .subscribe(subjects => {
            const formatted = subjects.subjectMaterials.map(material => {
              const sessions = subjects.quizSession.filter(val => material.id == val.quiz_id);
              return {
                material,
                sessions
              };
            });

            this.mgaLessons = formatted;
            console.log(formatted);
          });
      }
    );
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

      formData.append("created_by", userDetail.user_id + "");
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
