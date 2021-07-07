import request from "supertest";
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if provided it does not exist', async () => {
  let id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
  .put(`/api/tickets/${id}`)
  .set('Cookie', global.signUp())
  .send({title: "abcd", price: 20 })
  .expect(404);
});

// it('returns 401 if user is not authenticated', async () => {
//   const response = await request(app)
//     .post(`/api/tickets`)
//     .set('Cookie', global.signUp())
//     .send({title: "abcd", price: 20 });
//   await request(app)
//     .put(`/api/tickets/${response.body.id}`)
//     .set('Cookie', global.signUp())
//     .send({
//       title: 'bbkb',
//       price: 1000
//     })
//     .expect(401);
// });

it('returns 400 if user provides an invalid title or price', async () => {
  const cookie = global.signUp();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({title: "abcd", price: 20 });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: "", price: 0 })
    .expect(400);
});

it('updates ticket provided valid ticket details', async () => {
  const cookie = global.signUp();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({title: "abcd", price: 20 });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: "abcde", price: 22 })
    .expect(200);
});
