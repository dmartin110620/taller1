import { createRouter, Route, RootRoute, Outlet } from '@tanstack/react-router';
import HomePage from './homePage';

// root route
const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

// homepage route 
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Create router
const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
