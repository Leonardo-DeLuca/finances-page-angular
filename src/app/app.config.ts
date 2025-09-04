import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions({
      onViewTransitionCreated: ({ transition }) => {
        const router = inject(Router);
        const nav = router.currentNavigation();

        const from = nav?.previousNavigation?.finalUrl?.toString();
        const to = nav?.finalUrl?.toString();

        // 👇 só cancela se for exatamente de /register → /login
        if (from === '/register' && to === '/login') {
          transition.skipTransition();
        }
      }
    })),
    provideHttpClient()
  ]
};
