import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-lecture-content',
  imports: [DrawerComponent, TopbarComponent],
  templateUrl: './lecture-content.component.html',
  styleUrl: './lecture-content.component.css'
})
export class LectureContentComponent implements OnInit {

  constructor(
    private router: ActivatedRoute
  ){}

  docType = '';

  ngOnInit(): void {
    this.router.queryParams.subscribe(param => {
      const docType = (param as any).type;
      this.docType = docType;
    })
  }

}
