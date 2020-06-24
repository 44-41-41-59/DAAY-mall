'use strict';

const supergoose = require('@code-fellows/supergoose');

const server = require('../../src/server').server;

const mockRequest = supergoose(server);
describe('BASIC AUTH MODULE', () => {
  let user = {
    username:'name',
    password:'0000',
  };
  it('its should return error if something went wrong',()=>{
    return mockRequest.post('/auth').send(user)
      .then(results=>{
        expect(results.status).toEqual(400);  
      });
  });
});