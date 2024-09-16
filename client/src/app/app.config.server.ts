import { mergeApplicationConfig, ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { GlobalErrorHandler } from '../core/error-handler';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
