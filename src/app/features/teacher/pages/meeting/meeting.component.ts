import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingService, MeetingSession } from '../subject-detail/services/meeting.service';
import { AuthService } from '../../../../services/auth.service';
import { ZoomMtg } from '@zoom/meetingsdk';
import { catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-meeting',
  imports: [],
  templateUrl: './meeting.component.html',
  styles: ``
})
export class MeetingComponent implements OnInit, OnDestroy {

  code?: string;
  teacherSubjectId?: number;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private authService: AuthService,
    private http: HttpClient,
    private ngZone: NgZone
  ) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.teacherSubjectId = parseInt(params['teacherSubjectId']);
    });

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
  }

  session?: MeetingSession;

  ngOnInit(): void {
    const userDetail = this.authService.getUserDetail();
    if (this.code)
      this.meetingService.createMeeting(this.code, {
        "type": 2,
        "start_time": "2025-05-05T10:00:00Z",
        "duration": 30,
        "timezone": "Asia/Manila",
        "agenda": "Discuss project",
        "settings": {
          "join_before_host": true,
          "approval_type": 0
        },

        "teacher_id": userDetail.id,
        "teacher_assigned_subject_id": this.teacherSubjectId // todo para dynamic ni siya
      })
        .pipe(
          tap(val => {
            console.log("createMeeting", val);
            this.getSignature(val.data);
          })
        ).subscribe();
  }

  startMeeting(signature: string, meetingSession: MeetingSession) {
    document.getElementById('zmmtg-root')!.style.display = 'block';

    const userDetail = this.authService.getUserDetail();

    this.ngZone.runOutsideAngular(() => {
      ZoomMtg.init({
        leaveUrl: `${environment.apiURL}/graphql-ext/delete-meeting?code=${this.code}&redirect_url=http://localhost:4200/`,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        success: (success: any) => {
          ZoomMtg.join({
            signature: signature,
            sdkKey: environment.sdkKey,
            meetingNumber: meetingSession.meetingID,
            passWord: meetingSession.password,
            userName: `${userDetail.firstname} ${userDetail.lastname}`,
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
    console.log("meeting session", meetingSession);

    this.http.post(`${environment.apiURL}/zoom/sdk-endpoint`, {
      meetingNumber: meetingSession.meetingID,
      role: 1
    })
      .pipe(
        tap((val: any) => {
          if (val.signature)
            this.startMeeting(val.signature, meetingSession);
          console.log(val);
        }),
        catchError(res => {
          console.log(res);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {

  }
}
