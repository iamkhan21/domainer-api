import { Request } from 'itty-router';
import { GithubApi } from '../domains/services/github-api';

const Projects = async (
  request: Required<Pick<Request, 'params'>>,
): Promise<Response> => {
  const { user, cursor } = request.params;

  const repositories = await new GithubApi().getUserRepos(user, cursor);

  const body = JSON.stringify(repositories);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  return new Response(body, { headers });
};

export default Projects;
