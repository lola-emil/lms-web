import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../../../shared/components/topbar/topbar.component";
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { QuizComponent } from "../../components/quiz/quiz.component";

@Component({
  selector: 'app-lecture-content',
  imports: [DrawerComponent, TopbarComponent, QuizComponent],
  templateUrl: './lecture-content.component.html',
  styleUrl: './lecture-content.component.css'
})
export class LectureContentComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private location: Location
  ){}

  docType = '';

  ngOnInit(): void {
    this.router.queryParams.subscribe(param => {
      const docType = (param as any).type;
      this.docType = docType;
    })
  }


  goBack() {
    this.location.back();
  }
}
