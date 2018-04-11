import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Error } from 'app/_models/Error';

@Injectable()
export class SnackbarMessagingService {

  constructor(private snackBar: MatSnackBar) { }

  displayError(error: Error, duration: number, action?: string): void {
    this.snackBar.open(error.error, action, {
      announcementMessage: error.error,
      duration,
      panelClass: 'error-snackbar'
    });
  }

  displayErrorMessage(error: string, duration: number, action?: string): void {
    this.snackBar.open(error, action, {
      announcementMessage: error,
      duration,
      panelClass: 'error-snackbar'
    });
  }

  displaySuccess(message: string, duration: number, action?: string): void {
    this.snackBar.open(message, action, {
      announcementMessage: message,
      duration,
      panelClass: 'success-snackbar'
    });
  }

  displayMessage(message: string, duration: number, action?: string): void {
    this.snackBar.open(message, action, {
      announcementMessage: message,
      duration
    });
  }
}
