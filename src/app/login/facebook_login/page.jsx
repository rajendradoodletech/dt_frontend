"use client"

import { useEffect } from 'react';

const FacebookLogin = () => {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: '612560507875780', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });
    };

    // Load the SDK script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);
  const handleLogin = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {
          console.log('Logged in:', response);
          // Access token
          const accessToken = response.authResponse.accessToken;

          // Fetch user details or link with WhatsApp
          FB.api('/me', { fields: 'id,name,email' }, function (userInfo) {
            console.log('User Info:', userInfo);
            // Call your backend API to associate the user with WhatsApp
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'whatsapp_business_management,public_profile,email' }
    );
  };

  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Login with Facebook
    </button>
  );
};

export default FacebookLogin;