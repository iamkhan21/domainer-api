import { handleRequest } from '../src/handler';
import makeServiceWorkerEnv from 'service-worker-mock';
import PostsStore from '../src/domains/services/posts-store';

declare let global: any;

describe('handle', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  test('handle GET secret', async () => {
    const result = await handleRequest(
      new Request('/secret', { method: 'GET' }),
    );
    expect(result.status).toEqual(200);
    const secret = await result.json();

    expect(secret).toEqual('secret empty');
  });

  test('handle GET posts', async () => {
    const result = await handleRequest(
      new Request('/api/posts', { method: 'GET' }),
    );
    expect(result.status).toEqual(200);
    const posts = await result.json();
    const p = await new PostsStore().all();
    expect(posts).toEqual(p);
  });

  test('handle GET post', async () => {
    const result = await handleRequest(
      new Request('/api/posts/2', { method: 'GET' }),
    );
    expect(result.status).toEqual(200);
    const post = await result.json();
    const p = await new PostsStore().find(2);
    expect(post).toEqual(p);
  });
});
