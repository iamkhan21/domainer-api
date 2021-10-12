import { handleRequest } from '../src/handler';
import repos from './__mock__/repos.json';
import makeServiceWorkerEnv from 'service-worker-mock';

jest.mock('../src/domains/services/github', () => {
  return function () {
    return {
      getUserRepos: () => {
        return repos;
      },
    };
  };
});

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
      new Request('/api/projects/iamkhan21', { method: 'GET' }),
    );
    expect(result.status).toEqual(200);
    const projects = await result.json();

    expect(projects.repositories.length).toEqual(2);
  });
});
