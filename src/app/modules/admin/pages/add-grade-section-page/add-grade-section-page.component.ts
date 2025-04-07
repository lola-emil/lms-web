import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { GradeLevel, GradeLevelService } from '../../../../repositories/grade-level.service';
import { catchError, of, tap } from 'rxjs';
import { GradeSectionService } from '../../../../repositories/grade-section.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-grade-section-page',
  imports: [LayoutComponent, SectionComponent, ReactiveFormsModule],
  templateUrl: './add-grade-section-page.component.html',
  styles: ``
})
export class AddGradeSectionPageComponent implements OnInit {

  gradeLevels: GradeLevel[] = [];

  gradeSectionForm = new FormGroup({
    grade_level_id: new FormControl(0),
    section_name: new FormControl('')
  })

  constructor(
    private gradeLevelService: GradeLevelService,
    private gradeSectionService: GradeSectionService
  ) { }

  ngOnInit(): void {
    this.gradeLevelService.getGradeLevels().pipe(
      tap(data => {
        this.gradeLevels = data;
        console.log(data);
      }),
      catchError(error => {
        console.log(error);
        return of(null);
      })
    ).subscribe();
  }


  onSubmit() {
    this.gradeSectionService.addGradeSection(this.gradeSectionForm.value)
    .pipe(
      tap(data => {
        console.log(data);
      }),

      catchError(error => {
        console.log(error)
        return of(null);
      })
    ).subscribe();
  }



}
