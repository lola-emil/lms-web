import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule, FormBuilder, Form, FormArray } from "@angular/forms";
import { UserService } from '../../../../repositories/user.service';
import { catchError, of, tap } from 'rxjs';
import { GradeLevel, GradeLevelService } from '../../../../repositories/grade-level.service';
import { GradeSection, GradeSectionService } from '../../../../repositories/grade-section.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styles: ``
})
export class UserFormComponent {

  userFormGroup: FormGroup;

  gradeLevels: GradeLevel[] = [];
  gradeSections: GradeSection[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private gradeLevelService: GradeLevelService,
    private gradeSectionService: GradeSectionService
  ) {
    this.userFormGroup = new FormGroup({
      firstname: new FormControl(""),
      middlename: new FormControl<string | null>(null),
      lastname: new FormControl(""),
      address: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
      role: new FormControl<string | null>(null),

      student_info: new FormGroup({
        student_no: new FormControl(""),
        grade_level_id: new FormControl<number | null>(null),
        grade_section_id: new FormControl<number | null>(null)
      }),

      enrolled_subjects: this.fb.array([this.createSubject()])
    });


    // Set ang grade levels
    this.gradeLevelService.getGradeLevels()
      .pipe(
        tap(data => {
          this.gradeLevels = data;
        }),
        catchError(error => {
          console.log("Grade Level Error: ", error);
          return of(null);
        })
      ).subscribe();
  }

  updateSection(event: Event) {
    const selected = (<HTMLSelectElement>event.target).value;


    this.gradeSectionService.getGradeSections(selected)
      .pipe(
        tap(data => {
          console.log(data);
          this.gradeSections = data;
        }),
        catchError(error => {
          console.log(error);
          return of(error);
        })
      ).subscribe();
  }

  createSubject(): FormGroup {
    return this.fb.group({
      subject_id: [''],
      grade_level_id: [''],
      grade_section_id: ['']
    });
  }



  selectedRole?: string; // student | teacher | admin

  updateRoleInfoSection(event: Event) {
    this.selectedRole = (<HTMLSelectElement>event.target).value;
  }

  get enrolledSubjects(): FormArray {
    return this.userFormGroup.get('enrolled_subjects') as FormArray;
  }

  addTeacherEnrolledSubject() {
    this.enrolledSubjects.push(this.createSubject());
  }

  removeTeahcerSubject(index: number) {
    this.enrolledSubjects.removeAt(index);
  }

  onSubmit() {
    console.log(this.userFormGroup.value);

    this.userService.addUser(this.userFormGroup.value)
      .pipe(
        tap(value => {
          console.log(value);
        }),
        catchError(error => {
          console.log(error.error.data);
          return of(null);
        })
      ).subscribe();
  }

}
