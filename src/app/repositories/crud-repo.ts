import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

type QueryModifiers<T> = {
  offset?: number,
  limit?: number,
  cols?: string,

  order?: "desc" | "asc",

  orderby?: keyof T;

} & {
  [K in keyof T]?: T[K] | T[K][];
};


export class CrudRepo<T> {

  apiURL = "http://localhost:8081/api";
  endpoint: string = "";
  http!: HttpClient;

  accessToken: string = "";
  constructor(
    http: HttpClient,
    private moduleName: string,
    private resourceName: string
  ) {
    this.endpoint = `${this.apiURL}/${this.moduleName}/${this.resourceName}`;
    this.http = http;

    this.accessToken = JSON.parse(localStorage.getItem("user-detail") ?? "{}").token;
  }

  count(query?: QueryModifiers<Partial<T>>) {
    let params = new HttpParams();

    if (query)
      Object.entries(query).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params = params.set(key, value.toString());
        }
      });

    return this.http.get<{ count: number; }>(`${this.endpoint}/count`, {
      params,
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  get(query?: QueryModifiers<Partial<T>>) {
    let params = new HttpParams();

    if (query)
      Object.entries(query).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params = params.set(key, value.toString());
        }
      });

    return this.http.get<T[]>(`${this.endpoint}/`, {
      params,
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }
  post(body: any) {
    return this.http.post(`${this.endpoint}/`, body, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  patch(id: number | string, body: any) {
    return this.http.patch(`${this.endpoint}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  delete(id: number | string) {
    this.http.delete(`${this.endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }
}
