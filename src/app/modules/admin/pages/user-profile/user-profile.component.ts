import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserRepoService } from '../../../../repositories/user-repo.service';
import { Subscription, tap } from 'rxjs';
import { UserProfileRepoService } from '../../../../repositories/user-profile-repo.service';
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { UserRole, UserRoleRepoService } from '../../../../repositories/user-role-repo.service';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styles: ``
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  userRoleList: UserRole[] = [];

  formGroup = new FormGroup({
    fname: new FormControl(),
    mname: new FormControl(),
    lname: new FormControl(),
    role: new FormControl(),
    email: new FormControl(),
    contact_no: new FormControl()
  });

  private userId: string | null = null;
  @ViewChild("profileImage") profileImage!: ElementRef<HTMLImageElement>;

  constructor(
    private userRepo: UserRepoService,
    private userProfileRepo: UserProfileRepoService,
    private userRoleRepo: UserRoleRepoService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(val => {
      this.userId = val.get("id");
      console.log(this.userId);
    });
  }

  previewImage(event: Event) {
    const input = event.target as HTMLInputElement;

    console.log(input);

    if (input.files) {
      const objURI = URL.createObjectURL(input.files[0]);
      this.profileImage.nativeElement.src = objURI;
    }
  }


  ngOnInit(): void {
    console.log(this.userId);

    this.subscriptions.push(
      this.userRepo.get({
        id: parseInt(this.userId ?? "")
      }).pipe(
        tap(val => {
          const user = val[0];

          this.formGroup.patchValue({
            role: user.user_role_id,
            email: user.email
          });
        })
      ).subscribe(),

      this.userProfileRepo.get({
        user_id: parseInt(this.userId ?? "")
      }).pipe(
        tap(val => {
          const profile = val[0];

          this.formGroup.patchValue({
            fname: profile.fname,
            mname: profile.mname,
            lname: profile.lname,
            contact_no: profile.contact_no // if available
          });
          console.log(val);
        })
      ).subscribe(),

      this.userRoleRepo.get()
        .subscribe(val => this.userRoleList = val)
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
