"use client"

import { useEffect } from 'react';

const FacebookSDK = () => {
  useEffect(() => {
    // Load the Facebook SDK
    const fbScript = document.createElement('script');
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = 'anonymous';
    fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';

    fbScript.onload = () => {
      window.fbAsyncInit = () => {
        FB.init({
          appId: '1182716789356444', // your app ID
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v21.0', // Graph API version
        });
      };
    };

    document.body.appendChild(fbScript);

    // Clean up
    return () => {
      document.body.removeChild(fbScript);
    };
  }, []);

  const fbLoginCallback = (response) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      console.log('response: ', code); // Handle success
    } else {
      console.log('response: ', response); // Handle failure
    }
  };

  const launchWhatsAppSignup = () => {
    FB.login(fbLoginCallback, {
      config_id: '956509913042099', // your configuration ID
      response_type: 'code',
      override_default_response_type: true,
      extras: {
        setup: {},
        featureType: '',
        sessionInfoVersion: '3',
      },
    });
  };

  return (
    <div>
      <button
        onClick={launchWhatsAppSignup}
        style={{
          backgroundColor: '#1877f2',
          border: 0,
          borderRadius: '4px',
          color: '#fff',
          cursor: 'pointer',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '16px',
          fontWeight: 'bold',
          height: '40px',
          padding: '0 24px',
        }}
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookSDK;