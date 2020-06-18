/* eslint-disable no-undef */
'use strict';

document
  .getElementById('loginbtn')
  .addEventListener('click', loginWithFacebook, false);

// function triggered by the a tag in the index.html to fetch data from facebook sdk
function loginWithFacebook() {
  FB.login(
    (response) => {
      const {
        authResponse: { accessToken, userID },
      } = response;
      FB.api(`/${userID}/?fields=id,name,email,picture`, 'GET', {}, function (response) {
        let data = JSON.stringify(response);
        console.log(data);
      });

      fetch('/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, userID }),
      }).then((res) => {
        console.log(res);
      });
    },
    { scope: 'public_profile,email' },
  ); //we can only add these scopes with no app review
  return false;
}
