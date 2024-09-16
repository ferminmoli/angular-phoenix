import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

class HttpNoNetworkConnectionError extends Error {
  wasCaught = false;

  constructor() {
    super('No network connection');
  }
}

const MESSAGES = {
  INTERNAL_ERROR: 'An internal error has occurred. Please try again later.',
  NO_CONNECTION: 'No network connection. Please try again later.'
}

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);
  return next(req).pipe(catchError(error => {
      let errorMessage: string;

      if (checkNoNetworkConnection(error)) {
        errorMessage = MESSAGES.NO_CONNECTION;

        error = new HttpNoNetworkConnectionError();

        error.wasCaught = true;
      }
      else if (is400ResponseError(error)) {
        errorMessage = '';
      }
      else {
        errorMessage = MESSAGES.INTERNAL_ERROR
      }

      if (errorMessage) {
        snackbar.open(errorMessage);
      }

      throw error;
    })
  );
};

function check200ResponseBodyFormat(response: HttpResponse<any>): boolean {
  return (
    response.body.status === 'ok' &&
    response.body.data !== undefined
  );
}

function checkNoNetworkConnection(error: any): boolean {
  return (
    error instanceof HttpErrorResponse &&
    !error.headers.keys().length &&
    !error.ok &&
    !error.status &&
    !error.error.loaded &&
    !error.error.total
  );
}

function is400ResponseError(error: any) {
  return (error instanceof HttpErrorResponse && error.status === HttpStatusCode.BadRequest);
}