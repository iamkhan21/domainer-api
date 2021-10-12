import { Request } from 'itty-router';
import Store from '../domains/services/posts-store';

const Post = async (request: Request): Promise<Response> => {
  const posts = new Store();

  const postId = request.params?.id || '';

  const body = JSON.stringify(await posts.find(postId));
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  return new Response(body, { headers });
};

export default Post;
