const request = require('supertest');
const mongo = require('mongoose');
const app = require('../app');

describe('api', () => {
  beforeAll(async () => {
    // eslint-disable-next-line no-underscore-dangle
    await mongo.connect(
      'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT'
    );
    process.env.JWT_SECRET = 'secret';
  });

  afterAll(async () => {
    await mongo.connection.close();
  });

  describe('groups - logged out', () => {
    beforeAll(async () => {
      // // sign up user
      // const response = await request(app)
      //   .post('/users/login')
      //   .send({
      //     user: 'test',
      //     password: 'password',
      //   })
      //   .set('Content-Type', 'application/json')
      //   .expect(201);
      // token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
      // console.log('token', token);
    });

    it('should reject joining group if not logged in', async () => {
      const response = await request(app)
        .post('/groups/joinGroup')
        .send({
          groupName: 'test',
          joinCode: 1234,
        })
        .set('content-type', 'application/json');

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toEqual('Not Authorized. No Token');
    });
  });

  describe('groups - logged in', () => {
    let token = '';
    beforeAll(async () => {
      // sign up user
      const response = await request(app)
        .post('/users/login')
        .send({
          user: 'test',
          password: 'password',
        })
        .set('Content-Type', 'application/json')
        .expect(201);

      token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
      console.log('token', token);
    });

    it.skip('should show message creating group if logged in', async () => {
      const response = await request(app)
        .post('/groups/newGroup')
        .set('cookie', [`access_token=${token}`])
        .send({
          groupName: 'testgroup',
          joinCode: 1234,
        })
        .set('content-type', 'application/json');

      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual('testgroup group created');
    });

    it('should show message joining group if logged in', async () => {
      const response = await request(app)
        .post('/groups/joinGroup')
        .set('cookie', [`access_token=${token}`])
        .send({
          groupName: 'testGroup',
          joinCode: 1234,
        })
        .set('content-type', 'application/json');

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toEqual(
        'Group not joined, check Group Name or Join Code'
      );
    });
  });

  // describe('login', () => {
  //   beforeAll(async () => {
  //     await request(app)
  //       .post('/signup')
  //       .send({
  //         name: 'testUser',
  //         email: 'user@test.com',
  //         password: 'password123',
  //         birthday: '06/20/2022',
  //         phoneNumber: '(248) 456-7890',
  //       })
  //       .set('content-type', 'application/json')
  //       .expect(201);
  //   });

  //   it('should reject if no matching user', async () => {
  //     const response = await request(app)
  //       .post('/login')
  //       .send({
  //         email: 'wronguser@test.com',
  //         password: 'password123',
  //       })
  //       .set('content-type', 'application/json');

  //     expect(response.statusCode).toEqual(401);
  //     expect(response.body).toEqual({
  //       message: 'Email or password did not match',
  //     });
  //   });

  //   it('should reject if password does not match', async () => {
  //     const response = await request(app)
  //       .post('/login')
  //       .send({
  //         email: 'user@test.com',
  //         password: 'wrongpassword123',
  //       })
  //       .set('content-type', 'application/json');

  //     expect(response.statusCode).toEqual(401);
  //     expect(response.body).toEqual({
  //       message: 'Email or password did not match',
  //     });
  //   });

  //   it('should return token if email and password match', async () => {
  //     const response = await request(app)
  //       .post('/login')
  //       .send({
  //         email: 'user@test.com',
  //         password: 'password123',
  //       })
  //       .set('content-type', 'application/json');

  //     expect(response.statusCode).toEqual(200);
  //     expect(response.body).toEqual({ success: true });
  //     expect(response.headers['set-cookie']).toBeTruthy();
  //   });
  // });
});
