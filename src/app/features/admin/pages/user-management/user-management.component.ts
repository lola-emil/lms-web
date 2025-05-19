import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { catchError, of, tap } from 'rxjs';
import { User, UserManagementService } from './services/user-management.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastContainerComponent } from "../../../../shared/components/toast-container/toast-container.component";
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { RouterLink } from '@angular/router';

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
    this.userManagementService.getUsers()
      .pipe(
        tap(val => {
          this.mgaUsers = val.data.users;
        })
      )
      .subscribe();
  }

  showImportModal() {
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

  uploadImportFiles() {
    this.userManagementService.uploadImportFile(this.importFiles[0])
      .subscribe(res => {
        console.log(res);
        setTimeout(() => {
          console.log('Triggering getUsers()...');
          this.getUsers();  // Ensure this is being reached
        }, 500);
        this.importUserModal.nativeElement.close();
      });
  }

  submitUser() {
    console.log(this.userFormGroup.value);
    this.userManagementService.submitUser(this.userFormGroup.value).subscribe(res => {
      console.log(res);
      this.addUserModal.nativeElement.close();
      this.getUsers();
    });
  }
}
