const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');

describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('signup a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      });

    expect(response.body).toEqual({
      userId: expect.any(String),
      email: 'test@test.com',
      profilePhotoUrl: null,
    });
  });

  it('logs in a user via POST', async() => {
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password',
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      });

    expect(response.body).toEqual({
      userId: user.userId,
      email: 'test@test.com',
      profilePhotoUrl: null,
    });
  });
});
