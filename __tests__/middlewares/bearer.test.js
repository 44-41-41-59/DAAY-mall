'use strict';

const {server} = require('../../src/middlewares/auth/bearer');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('testing the server',()=>{

  it('GET /product', async() => {
    mockRequest
      .get('/product')
      .set('Authorization', 'Bearer $2a$05$QxBx7Jx4GxmnowTy7eTxiOX9dFzxK/V4LxwoeuwyxJFuH7ww9JW5a')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('POST /add', async() => {
    mockRequest
      .post('/product')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRjMTEzYmU0NDk2N2ZlYzk3ZjNmNSIsImNhcGFiaXRpZXMiOlsicmVhZCIsImFkZCIsImNoYW5nZSIsInJlbW92ZSJdLCJpYXQiOjE1OTIwNDk5NDB9.qnHcbmmT0IK8qmH4hnSjGfuiTsSRxorNbWUbL0Xt4Hk')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

      
  it('PUT /change', async() => {
    mockRequest
      .put('/product')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRjMTEzYmU0NDk2N2ZlYzk3ZjNmNSIsImNhcGFiaXRpZXMiOlsicmVhZCIsImFkZCIsImNoYW5nZSIsInJlbW92ZSJdLCJpYXQiOjE1OTIwNDk5NDB9.qnHcbmmT0IK8qmH4hnSjGfuiTsSRxorNbWUbL0Xt4Hk')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });


  it('DELETE /remove', async() => {
    mockRequest
      .delete('/product')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRjMTEzYmU0NDk2N2ZlYzk3ZjNmNSIsImNhcGFiaXRpZXMiOlsicmVhZCIsImFkZCIsImNoYW5nZSIsInJlbW92ZSJdLCJpYXQiOjE1OTIwNDk5NDB9.qnHcbmmT0IK8qmH4hnSjGfuiTsSRxorNbWUbL0Xt4Hk')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('POST /add but the user is not authorized ', async() => {
    mockRequest
      .post('/product')
      .set('Authorization', 'Bearer $2a$05$QxBx7Jx4GxmnowTy7eTxiOX9dFzxK/V4LxwoeuwyxJFuH7ww9JW5a')
      .then(data => { 
        expect(data.status).toBe(500);
      });
  });
});