import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { QuizComponent } from "../../components/quiz/quiz.component";
import { LectureContentService, SubjectMaterial } from './services/lecture-content.service';

@Component({
  selector: 'app-lecture-content',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './lecture-content.component.html',
  styleUrl: './lecture-content.component.css'
})
export class LectureContentComponent implements OnInit {

  material?: SubjectMaterial;
  materialId?: number;
  constructor(
    private router: ActivatedRoute,
    private location: Location,
    private lectureContentService: LectureContentService
  ) {
    this.router.params.subscribe(val => this.materialId = val["id"]);
  }


  ngOnInit(): void {
    this.lectureContentService.getLessonContent(this.materialId ?? 0)
      .subscribe(val => {
        this.material = val.data.subjectMaterial;
      });
  }


  goBack() {
    this.location.back();
  }
}
