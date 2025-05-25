import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';


export type MeetingBody = {
  type: number;
  start_time: string;
  duration: number;
  timezone: string;
  agenda: string;
  settings: {
    join_before_host: boolean;
    approval_type: number;
  };
  teacher_id: number,
  teacher_assigned_subject_id: number,
};

export type MeetingSession = {
  id: number;
  uuid: string;
  meetingID: string;
  hostID: string;
  hostEmail: string;
  topic: string;
  startURL: string;
  joinURL: string;
  password: string;
  onGoing?: boolean;
  teacherAssignedSubjectId: number;
  createdBy: number;
};



@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    localStorage.getItem("zoom");
  }

  createMeeting(code: string, meetingInfo: Partial<MeetingBody>) {
    return this.http.post<{ data: MeetingSession; }>(`${environment.apiURL}/zoom/oauth/callback`, {
      ...meetingInfo,
      code,
      redirect_uri: `${environment.host}/teacher/meeting?teacherSubjectId=${meetingInfo.teacher_assigned_subject_id}`
    });
  }

  authorize(teacherSubjectId: number) {
    return this.http.get<{ redirect_url: string; }>(`${environment.apiURL}/zoom/authorize`, {
      params: {
        redirect_uri: `${environment.host}/teacher/meeting?teacherSubjectId=${teacherSubjectId}`
      }
    });
  }

}
