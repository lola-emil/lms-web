import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { Location } from '@angular/common';
import { LessonContentService, SubjectMaterial } from './services/lesson-content.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson-content',
  imports: [DrawerComponent, TopbarComponent, RouterLink],
  templateUrl: './lesson-content.component.html',
  styles: ``
})
export class LessonContentComponent implements OnInit {
    material?: SubjectMaterial;
  materialId?: number;
  constructor(
    private route: ActivatedRoute,
    private lessonContentService: LessonContentService,
  ) {
    this.route.params.subscribe(val => this.materialId = val["id"]);
  }

  ngOnInit(): void {
    this.lessonContentService.getLessonContent(this.materialId ?? 0)
      .subscribe(val => {
        this.material = val.data.subjectMaterial;
      });
  }

}
