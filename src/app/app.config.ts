import { ApplicationConfig, inject, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideApollo } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/cache';
import { environment } from "../environments/environment";

import { provideQuillConfig } from 'ngx-quill/config';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),
  provideQuillConfig({
    modules: {
      // syntax: true,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],

        ['link', 'image', 'video']
      ]
    }
  }),
  provideApollo(() => {
    const httpLink = inject(HttpLink);

    return {
      link: httpLink.create({ uri: `${environment.apiURL}/graphql` }),
      cache: new InMemoryCache(),
    };
  }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};

