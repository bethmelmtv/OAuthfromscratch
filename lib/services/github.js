const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const client_id = process.env.CLIENT_ID;
  console.log(client_id, 'client_id');
  const client_secret = process.env.CLIENT_SECRET;
  console.log(client_secret, 'client_secret');

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  console.log(response, 'response');
  const resp = await response.json();
  return resp.access_token;
};

const getGithubProfile = async (token) => {
  console.log('hello!');
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return response.json();
};

module.exports = { exchangeCodeForToken, getGithubProfile };
