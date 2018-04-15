import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch(err => {
                return Observable.throw(this.handleError(err));
            })
    }

    private handleError(error: any) {
        let errorMessage: any;
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
                this.router.navigateByUrl('/');
            }
            errorMessage = error.error || JSON.stringify(error);
            if (errorMessage.error) {
                errorMessage = errorMessage.error;
            }
            errorMessage = `${error.status} - ${error.statusText || ''}: ${errorMessage}`;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }
        return Observable.throw(errorMessage);
    }
}
