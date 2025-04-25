import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseModuleService } from '../../services/course-module.service';
import { Observable, switchMap, map, forkJoin, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SubjectMaterial, SubjectMaterialRepoService } from '../../../../repositories/subject-material-repo.service';
import { QuizSession, QuizSessionRepoService } from '../../../../repositories/quiz-session-repo.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-lectures',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent {
  lessons$!: Observable<any>;


  mgaLessons: {
    material: SubjectMaterial,
    sessions: QuizSession[];
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseModuleService: CourseModuleService,
    private subjectMaterialRepo: SubjectMaterialRepoService,
    private quizSessionRepo: QuizSessionRepoService,
    private authService: AuthService
  ) {
    this.lessons$ = this.route.parent!.params.pipe(
      map(param => param['id']),
      switchMap(courseId => this.courseModuleService.getByCourseId(courseId)),
      map(response => (response as any).data)


    );

    this.route.parent!.params.subscribe(
      val => {

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
}
