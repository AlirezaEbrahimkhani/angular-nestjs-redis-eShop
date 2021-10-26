import { HttpVerb } from '../types';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'apps/angular-nestjs-redis-e-shop/src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { GlobalService } from './global.service';

export function ApiRequest(verb: HttpVerb = 'GET'): RequstBuilderService {
  return new RequstBuilderService(verb);
}

export class RequstBuilderService {
  private _controller: string = '';
  private _action: string = '';
  private _body: Object = {};

  constructor(private verb: HttpVerb = 'GET') {}

  public Controller(controllerName: string) {
    this._controller = controllerName;
    return this;
  }

  public Action(actionName: string) {
    this._action = actionName;
    return this;
  }

  public Body(body: Object) {
    this._body = body;
    return this;
  }

  public call(gs: GlobalService): Observable<any> {
    const url = `${environment.servicBaseUrl}${this._controller}/${this._action}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.verb === 'GET') {
      return gs.http.get(url, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    } else if (this.verb === 'POST') {
      return gs.http.post(url, this._body, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    } else if (this.verb === 'PUT') {
      return gs.http.put(url, this._body, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    } else if (this.verb === 'DELETE') {
      return gs.http.delete(url, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    } else if (this.verb === 'PATCH') {
      return gs.http.patch(url, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    }
    return of();
  }

  private ErrorHandeling(error: HttpErrorResponse) {
    const { message, status } = error;
    console.log(`Status Code : ${status} , Message : ${message}`);
    return throwError(error);
  }
}
