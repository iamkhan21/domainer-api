import { Router } from 'itty-router';

import Posts from './handlers/posts';
import Post from './handlers/post';
import Secret from './handlers/secret';

const router = Router();

router
  .get('/secret', Secret)
  .get('/api/posts', Posts)
  .get('/api/posts/:id', Post)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: Request): Promise<Response> =>
  router.handle(request);
