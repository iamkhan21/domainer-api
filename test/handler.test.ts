import { handleRequest } from '../src/handler';
import makeServiceWorkerEnv from 'service-worker-mock';

declare let global: any;

describe('handle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    Object.assign(global, makeServiceWorkerEnv());
  });

  test('handle GET projects', async () => {
    global.GITHUB = process.env.GITHUB;

    const result = await handleRequest(
      new Request('/api/projects', { method: 'GET' }),
    );
    expect(result.status).toEqual(200);
    const projects = await result.json();

    expect(projects).toEqual({});
  });
});
