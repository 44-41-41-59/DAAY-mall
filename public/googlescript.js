'use strict';

let URL = 'https://accounts.google.com/o/oauth2/v2/auth';

let options = {
  client_id: '231626060877-16dgoo3dt8feqqu7gqu72mvgo1daq1if.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:3000/auth/oauth',
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  state: 'DAAY-mall',
  response_type: 'code ',
};

let QueryString = Object.keys(options).map((key) => {
  return `${key}=` + encodeURIComponent(options[key]);
}).join('&');

let authURL = `${URL}?${QueryString}`;

let link = document.getElementById('oauth');
link.setAttribute('href', authURL);