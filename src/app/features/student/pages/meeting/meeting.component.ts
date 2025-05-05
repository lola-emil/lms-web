import { Component, NgZone, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoom/meetingsdk';
import { MeetingService, MeetingSession } from '../../../teacher/pages/subject-detail/services/meeting.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-meeting',
  imports: [],
  templateUrl: './meeting.component.html',
  styles: ``
})
export class MeetingComponent implements OnInit {


  session?: MeetingSession;

  constructor(
    private meetingService: MeetingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private ngZone: NgZone
  ) {

    this.route.queryParams.subscribe(val => {
      this.session = val as MeetingSession;

      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
    });

  }

  ngOnInit(): void {
    const userDetail = this.authService.getUserDetail();

    if (this.session)
      this.getSignature(this.session);
  }


  startMeeting(signature: string, meetingSession: MeetingSession) {
    document.getElementById('zmmtg-root')!.style.display = 'block';
    const userDetail = this.authService.getUserDetail();
    this.ngZone.runOutsideAngular(() => {
      ZoomMtg.init({
        leaveUrl: "http://localhost:4200",
        patchJsMedia: true,
        leaveOnPageUnload: true,
        success: (success: any) => {
          console.log(success);
          ZoomMtg.join({
            signature: signature,
            sdkKey: environment.sdkKey,
            meetingNumber: meetingSession.meetingID,
            passWord: meetingSession.password,
            userName: `${userDetail.firstname} ${userDetail.lastname} ${userDetail.role}`,
            userEmail: meetingSession.hostEmail,
            tk: "",
            zak: "",
            success: (success: any) => {
              console.log(success);
            },
            error: (error: any) => {
              console.log(error);
            }
          });
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    });
  }

  getSignature(meetingSession: MeetingSession) {

    this.http.post(`${environment.apiURL}/zoom/sdk-endpoint`, {
      meetingNumber: meetingSession.meetingID,
      role: 0
    }).subscribe((data: any) => {
      if (data.signature) {
        console.log(data.signature);
        this.startMeeting(data.signature, meetingSession);
      } else {
        console.log(data);
      }
    });
  }
}
