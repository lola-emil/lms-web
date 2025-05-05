import { Component, Input, OnInit } from '@angular/core';
import { createAvatar } from "@dicebear/core";
import { pixelArt } from '@dicebear/collection';
import { AuthService } from '../../../../services/auth.service';
import { UserProfile, UserProfileRepoService } from '../../../../repositories/user-profile-repo.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  @Input() title: string = "";

  user?: UserProfile;
  role: string = "";

  constructor(
    private authService: AuthService,
    private profileRepo: UserProfileRepoService
  ) { }

  ngOnInit(): void {
    this.profileRepo.get({
      user_id: this.authService.getUserDetail().id
    }).subscribe(val => {
      console.log(val);
      this.user = val[0];
      this.role = this.authService.getUserDetail().role;
    });
  }

  avatar = createAvatar(pixelArt, {
    seed: "bilat sa Kabayo"
  }).toDataUri();


}
