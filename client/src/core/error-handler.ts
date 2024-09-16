import { ErrorHandler, Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('An error occurred:', error);

    // Send error details to a remote logging server or monitoring service if needed
    if (!isDevMode()) {
      // Example: send to an external service
    }
  }
}
