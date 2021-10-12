import Store from '../domains/services/posts-store';

const Posts = async (): Promise<Response> => {
  const posts = new Store();
  const body = JSON.stringify(await posts.all());
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  return new Response(body, { headers });
};

export default Posts;
