const request = require('supertest');
const app = require('../src/app'); // Double check this path!
const mongoose = require('mongoose');

test('Health check', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Welcome from Main branch");
});

afterAll(async () => {
  await mongoose.disconnect();
});