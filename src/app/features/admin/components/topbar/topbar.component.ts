import { Component, Input, OnInit } from '@angular/core';
import { createAvatar } from "@dicebear/core";
import { pixelArt } from '@dicebear/collection';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { SchoolYear, SchoolYearService } from '../../../../services/school-year.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  @Input() title: string = "";

  user?: {
    firstname: string;
    lastname: string;
    role: any;
  };
  role: string = "";

  currentSchoolYear?: SchoolYear;

  constructor(
    private authService: AuthService,
    private schoolYearService: SchoolYearService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUserDetail();
    this.user = user;

    this.schoolYearService.getCurrentSchoolYear()
      .subscribe(res => {
        console.log(res.data.currentSchoolYear);
        this.currentSchoolYear = res.data.currentSchoolYear;
      });
  }

  avatar = createAvatar(pixelArt, {
    seed: "bilat sa Kabayo"
  }).toDataUri();


}
