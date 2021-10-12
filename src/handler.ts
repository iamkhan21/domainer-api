import { Router } from 'itty-router';

import Projects from './handlers/projects';

const router = Router();

router
  .get('/api/projects/:user/:cursor?', Projects)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: Request): Promise<Response> =>
  router.handle(request);
