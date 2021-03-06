import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successfull signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);
});

it('returns a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test_test.com",
      password: "password"
    })
    .expect(400);
});

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "p"
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: "test@test.com" })
    .expect(400);
  
  await request(app)
    .post('/api/users/signup')
    .send({ password: "password" })
    .expect(400);
});

it('disallows aduplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ 
      email: "test@test.com",
      password: "password" 
    })
    .expect(201);
  
  await request(app)
    .post('/api/users/signup')
    .send({ 
      email: "test@test.com",
      password: "password" 
    })
    .expect(500);
});

it('sets a cookie after a successful signup', async () => {
  const response =  await request(app)
    .post('/api/users/signup')
    .send({
      email: "hello@test.com",
      password: "password"
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
