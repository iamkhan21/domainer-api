const Secret = async (): Promise<Response> => {
  // @ts-ignore
  const body = JSON.stringify({ data: SECRET1 || 'secret empty' });
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  return new Response(body, { headers });
};

export default Secret;
