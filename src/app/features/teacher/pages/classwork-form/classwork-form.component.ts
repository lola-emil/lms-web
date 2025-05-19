import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClassworkService } from '../classwork/services/classwork.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-classwork-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './classwork-form.component.html',
  styles: ``
})
export class ClassworkFormComponent {

  loadId: string = "";

  classworkFormGroup = new FormGroup({
    title: new FormControl(""),
    instruction: new FormControl(""),

    hps: new FormControl(),
    due_date: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private classworkService: ClassworkService
  ) {
    this.route.parent?.params.subscribe(val => {
      this.loadId = val["id"];
    });
  }

  submit() {
    const {
      title,
      instruction,
      due_date,
      hps
    } = this.classworkFormGroup.value;
    this.classworkService.createClasswork({
      title: title!,
      instructions: instruction!,
      dueDate: new Date(due_date).toISOString(),
      hps,
      teacherAssignedSubjectId: parseInt(this.loadId)
    }).subscribe(res => {
      console.log(res)
    });
  }
}
