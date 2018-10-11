import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarMessagingService } from '../_services/snackbar-messaging.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private sms: SnackbarMessagingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => this.handleError(err)));
    }

    private handleError(error: any) {
        let errorMessage: any;
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
                this.router.navigateByUrl('');
                this.sms.displayErrorMessage('You are not authenticated to access that page');
            }
            errorMessage = error.error || JSON.stringify(error);
            if (errorMessage.error) {
                errorMessage = errorMessage.error;
            }
            errorMessage = `${error.status} - ${error.statusText || ''}: ${errorMessage}`;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }
        return throwError(errorMessage);
    }
}
