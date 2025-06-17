import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import type { ValidateSearchParams } from '@/types/types.ts';

// Home
const indexRoute = createRoute({
  path: '/',
  getParentRoute: () => rootRoute,
  component: lazyRouteComponent(() => import('@/pages/Home.tsx')),
});
const collectionsRoute = createRoute({
  path: '/collections',
  getParentRoute: () => rootRoute,
  component: lazyRouteComponent(
    () => import('@/pages/collections/CollectionsLayout.tsx')
  ),
});

// Collections Section
const collectionsIndexRoute = createRoute({
  path: '/',
  getParentRoute: () => collectionsRoute,
  component: lazyRouteComponent(
    () => import('@/pages/collections/CollectionsIndex.tsx')
  ),
  validateSearch: (search: Record<string, unknown>): ValidateSearchParams => {
    const result: ValidateSearchParams = {};
    if (typeof search.query === 'string' && search.query.trim() !== '') {
      result.query = search.query;
    }
    if (typeof search.genres === 'string' && search.genres.trim() !== '') {
      result.genres = search.genres;
    } else if (Array.isArray(search.genres) && search.genres.length > 0) {
      result.genres = search.genres;
    }
    if (typeof search.startIndex === 'string') {
      const parsed = parseInt(search.startIndex);
      if (!isNaN(parsed) && parsed >= 0) {
        result.startIndex = parsed;
      }
    } else if (
      typeof search.startIndex === 'number' &&
      search.startIndex >= 0
    ) {
      result.startIndex = search.startIndex;
    }
    return result;
  },
});

const collectionsBookRoute = createRoute({
  path: 'books/$bookId',
  getParentRoute: () => collectionsRoute,
  component: lazyRouteComponent(() => import('@/pages/BookDetails')),
});

// Popular Section
const popularRoute = createRoute({
  path: '/popular',
  getParentRoute: () => rootRoute,
  component: lazyRouteComponent(
    () => import('@/pages/popular/PopularLayout.tsx')
  ),
});

const popularIndexRoute = createRoute({
  path: '/',
  getParentRoute: () => popularRoute,
  component: lazyRouteComponent(
    () => import('@/pages/popular/PopularIndex.tsx')
  ),
});

const favoritesBookRoute = createRoute({
  path: 'books/$bookId',
  getParentRoute: () => popularRoute,
  component: lazyRouteComponent(() => import('@/pages/BookDetails')),
});

// Route Tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionsRoute.addChildren([collectionsIndexRoute, collectionsBookRoute]),
  popularRoute.addChildren([popularIndexRoute, favoritesBookRoute]),
]);
