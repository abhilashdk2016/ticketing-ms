import request from 'supertest';
import { app } from '../../app';

it('fail when email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(500);
});

it('fail when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "jajkdgkgnkj"
    })
    .expect(500);
});

it('responds with a cokkie given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
