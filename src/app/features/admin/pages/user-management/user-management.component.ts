import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { catchError, of, tap } from 'rxjs';
import { User, UserManagementService } from './services/user-management.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastContainerComponent } from "../../../../shared/components/toast-container/toast-container.component";
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { RouterLink } from '@angular/router';


type Toast = {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // in ms
  message: string;
};

@Component({
  selector: 'app-user-management',
  imports: [DrawerComponent, TopbarComponent, ReactiveFormsModule, ToastContainerComponent, RouterLink],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent implements OnInit {
  @ViewChild("importUserModal") importUserModal!: ElementRef<HTMLDialogElement>;
  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild("addUserModal") addUserModal!: ElementRef<HTMLDialogElement>;

  mgaUsers: User[] = [];

  roles = ["ADMIN", "STUDENT", "TEACHER"];


  userFormGroup = new FormGroup({
    firstname: new FormControl(""),
    middlename: new FormControl<string | undefined>(undefined),
    lastname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    role: new FormControl("")
  });

  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.toastService.showToast("Madafaking bullshit", "success");
  }

  getUsers() {
    this.userManagementService.getUsers(this.page, this.selectedRole, this.searchQuery)
      .pipe(
        tap(val => {
          this.mgaUsers = val.data.users;
          this.userCount = val.data.count;

          this.maxPage = Math.ceil(this.userCount / this.userManagementService.limit);
        })
      )
      .subscribe();
  }


  page = 1;
  userCount = 0;
  maxPage = 1;
  selectedRole?: "ADMIN" | "STUDENT" | "TEACHER";
  searchQuery?: string;

  nextPage() {
    this.page += 1;
    this.getUsers();
  }

  prevPage() {
    this.page -= 1;
    this.getUsers();
  }

  filterUsers(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.selectedRole = target.value as any;

    this.getUsers();

    // if (target.value)
    //   this.userManagementService.getUserByRole((<any>target.value))
    //     .subscribe(res => {
    //       this.mgaUsers = res.data.userByRole;
    //     });
    // else
    //   this.getUsers();
  }

  selectedImportRole!: "TEACHER" | "STUDENT";

  showImportModal(role: "TEACHER" | "STUDENT") {
    this.selectedImportRole = role;
    this.importUserModal.nativeElement.showModal();

  }

  showAddUserModal() {
    this.addUserModal.nativeElement.showModal();
  }

  importFiles: File[] = [];

  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files) return;
    this.importFiles = Array.from(input.files);
  }

  onImportModalClosed() {
    this.importFiles = [];
    this.fileInput.nativeElement.value = "";
  }

  importInProgress = false;

  userErrors: any = {
    firstname: null,
    middlename: null,
    lastname: null,
    email: null,
    password: null,
    role: null
  }

  uploadImportFiles() {
    this.importInProgress = true;
    this.userManagementService.uploadImportFile(this.importFiles[0], this.selectedImportRole)
      .subscribe(res => {
        console.log(res);

        if (res.unsuccessful.length > 0)
          this.userManagementService.downloadCSV(res.unsuccessful, "unsuccessful.csv");

        this.getUsers();  // Ensure this is being reached
        this.importUserModal.nativeElement.close();
        this.importInProgress = false;
      });
  }

  submitUserInProgress = false;
  resetError() {
    this.userErrors = {
      firstname: null,
      middlename: null,
      lastname: null,
      email: null,
      password: null,
      role: null
    }
  }

  toastMessages: Toast[] = [];

  removeToast(index: number) {
    this.toastMessages.splice(index, 1);
  }

  addToast(toast: Toast) {
    this.toastMessages.push(toast);
    setTimeout(() => this.removeToast(this.toastMessages.length - 1), toast.duration || 3000);
  }

  submitUser() {
    this.submitUserInProgress = true;
    this.userManagementService.submitUser(this.userFormGroup.value).pipe(
      tap(res => {
        this.submitUserInProgress = false;
        this.getUsers();
        this.addUserModal.nativeElement.close();
        this.addToast({
          message: "User created successfully."
        })
      }),
      catchError(errRes => {
        console.log(errRes.error);
        this.resetError();
        (<any[]>errRes.error).forEach(error => {
          const field = error.context.label;
          // Only set the error message for the first error encountered per field
          if (!this.userErrors[field]) {
            this.userErrors[field] = error.message;
          }
        });
        this.submitUserInProgress = false;
        return of(null);
      })
    ).subscribe()
  }

  searchUser(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.getUsers();
  }
}
