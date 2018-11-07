import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  endpoint = environment.apiOrigin;

  constructor(private http: HttpClient) { }

  public getRequest(url) {
    return this.http.get(this.endpoint + url).pipe(map(response => {
      return response;
    }, error => {
      return this.handleError(error, this);
    }));
  }

  private handleError(error: Response | any, parantThis) {
    console.error(error);
    if (Number(error.error.code) === 401) {
      window.location.href = "/auth/login";
      parantThis.toastr.error(error.error.msg, error.error.code);
    } else {
      return Observable.throw(error);
    }
  }

}
