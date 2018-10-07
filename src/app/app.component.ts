import { Component } from '@angular/core';
import { ConnectionService } from './_services/connection.service';
import { SnackbarMessagingService } from './_services/snackbar-messaging.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private connectionService: ConnectionService, private sms: SnackbarMessagingService) {
        this.connectionService.monitor().subscribe(isConnected => {
          if (!isConnected) {
            this.sms.displayMessage('You are offline')
          }
        })
      }
}

