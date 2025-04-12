import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

type QueryModifiers<T> = {
  offset?: number,
  limit?: number,
  cols?: string,

  order?: "desc" | "asc",

  orderby?: keyof T;

} & T;


export class CrudRepo<T> {

  private apiURL = "http://localhost:8080/api";
  private endpoint: string = "";

  constructor(
    private http: HttpClient,
    private moduleName: string,
    private resourceName: string
  ) {
    this.endpoint = `${this.apiURL}/${this.moduleName}/${this.resourceName}`;
  }

  count() {
    return this.http.get<{ count: number; }>(`${this.endpoint}/count`);
  }

  get(query?: QueryModifiers<Partial<T>>) {
    let params = new HttpParams();

    if (query)
      Object.entries(query).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params = params.set(key, value.toString());
        }
      });

    return this.http.get<T[]>(`${this.endpoint}/`, { params });
  }
  post(body: any) {
    return this.http.post(`${this.endpoint}/`, body);
  }

  patch(id: number | string, body: any) {
    return this.http.patch(`${this.endpoint}/${id}`, body);
  }

  delete(id: number | string) {
    this.http.delete(`${this.endpoint}/${id}`);
  }
}
