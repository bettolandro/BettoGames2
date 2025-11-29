import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import esCl from '@angular/common/locales/es-CL';


// Registramos el locale chileno
registerLocaleData(esCl);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    { provide: LOCALE_ID, useValue: 'es-CL' }   // 👈 importante
  ]
}).catch(err => console.error(err));
