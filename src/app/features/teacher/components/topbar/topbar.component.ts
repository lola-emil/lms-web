import { Component, Input, OnInit } from '@angular/core';
import { createAvatar } from "@dicebear/core";
import { pixelArt } from '@dicebear/collection';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';

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

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserDetail();
  }

  avatar = createAvatar(pixelArt, {
    seed: "bilat sa Kabayo"
  }).toDataUri();


}
