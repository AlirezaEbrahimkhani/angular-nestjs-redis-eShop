import { HttpVerb, RequestHandler } from '../types';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'apps/angular-nestjs-redis-e-shop/src/environments/environment';
import { throwError } from 'rxjs';

export function ApiRequest(verb: HttpVerb = 'GET'): RequstBuilderService {
  return new RequstBuilderService(verb);
}

export class RequstBuilderService {
  private _controller: string = '';
  private _action: string = '';
  private _body: Object = {};

  constructor(private verb: HttpVerb = 'GET', private http?: HttpClient) {}

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

  public call() {
    const url = `${environment.servicBaseUrl}${this._controller}/${this._action}`;
    const hdrs = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.requestHandler[this.verb](url, hdrs, this._body);
  }

  requestHandler: RequestHandler = {
    GET: (url: string, headers: HttpHeaders) => {
      return this.http?.get(url, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    },
    DELETE: () => (url: string, headers: HttpHeaders) => {
      return this.http?.delete(url, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    },
    PATCH: () => (url: string, headers: HttpHeaders) => {
      return this.http?.patch(url, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    },
    POST: () => (url: string, headers: HttpHeaders, body: Object) => {
      return this.http?.post(url, body, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    },
    PUT: () => (url: string, headers: HttpHeaders, body: Object) => {
      return this.http?.put(url, body, { headers }).pipe(
        catchError((err) => {
          return this.ErrorHandeling(err);
        })
      );
    },
  };

  ErrorHandeling(error: HttpErrorResponse) {
    const { message, status } = error;
    console.log(`Status Code : ${status} , Message : ${message}`);
    return throwError(error);
  }
}
