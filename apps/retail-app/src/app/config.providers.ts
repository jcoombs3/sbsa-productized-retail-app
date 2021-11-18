import { Provider } from '@angular/core';
import { HttpXsrfInterceptor } from './services/http-xsrf.interceptor';
import { HTTP_INTERCEPTORS, HttpXsrfTokenExtractor } from '@angular/common/http';
import { AnimationDriver } from '@angular/animations/browser';
import { AppAnimationDriver } from './services/app.animation.driver';

export const HttpXsrfProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpXsrfInterceptor,
  deps: [HttpXsrfTokenExtractor],
  multi: true,
};

export const AnimationProvider: Provider = {
  provide: AnimationDriver,
  useClass: AppAnimationDriver,
};
