import { Request } from 'itty-router';
import GithubService from '../domains/services/github';

const access = 'https://domainer.pages.dev';

const Projects = async (
  request: Required<Pick<Request, 'params'>>,
): Promise<Response> => {
  const { user, cursor } = request.params;

  const repositories = await new GithubService().getUserRepos(user, cursor);

  const body = JSON.stringify(repositories);

  const headers = {
    'Access-Control-Allow-Origin': access,
    Vary: 'Origin',
    'Content-type': 'application/json',
  };
  return new Response(body, { headers });
};

export default Projects;
