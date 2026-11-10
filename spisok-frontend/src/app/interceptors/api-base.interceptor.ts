import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { environment } from '../../environments/environment';

export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const isServer = isPlatformServer(inject(PLATFORM_ID));

  console.log(
    isServer ? '[SSR] API request' : '[BROWSER] API request',
    req.url
  );

  const base = isServer
    ? environment.ssrApiUrl
    : environment.apiUrl;

  return next(req.clone({
    url: base + req.url.slice(4)
  }));
};