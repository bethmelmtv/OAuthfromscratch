const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oauth page upon login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('creates a new post for that user', async () => {
    const res = await request.agent(app); //this lets us log in

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        text: 'today is monday!!!',
      },
    ]);
  });

  it.only('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('lists all posts for that signed in user', async () => {
    const res = await request.agent(app); //this lets us log in

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        text: 'This is a post!',
      },
    ]);
  });
});
