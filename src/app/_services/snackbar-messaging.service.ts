import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarMessagingService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  displayError(message: string, duration: number, action?: string): void {
    this.snackBar.open(message, action, {
      announcementMessage: message,
      duration
    });
  }
}
