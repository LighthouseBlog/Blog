import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WindowRef } from './window.service';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    private connectionMonitor: Observable<boolean>;

    constructor(private winRef: WindowRef) {
        this.connectionMonitor = new Observable((observer) => {
            winRef.nativeWindow.addEventListener('offline', () => {
                observer.next(false);
            });
            winRef.nativeWindow.addEventListener('online', () => {
                observer.next(true);
            });
        });
    }

    monitor(): Observable<boolean> {
        return this.connectionMonitor;
    }
}
