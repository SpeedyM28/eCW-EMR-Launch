// CallbackPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CallbackPage() {
  const [tokenData, setTokenData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthorizationCode = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get('code'); // Extract 'code' from the URL
    };

    const code = getAuthorizationCode();

    if (code) {
      // Here you'd exchange the code for an access token
      // Simulate fetching the access token here
      fetchAccessToken(code).then((data) => {
        setTokenData(data);
        console.log('Access token data:', data);
      }).catch(error => {
        console.error('Error fetching token:', error);
      });
    } else {
      console.error('Authorization code not found.');
    }
  }, []);

  const fetchAccessToken = async (code) => {
    const tokenEndpoint = 'https://your-auth-server.com/token'; // Replace with actual token endpoint
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'https://your-github-pages-url.com/callback'); // Replace with actual redirect URL
    params.append('client_id', 'your-client-id');
    params.append('client_secret', 'your-client-secret'); // If applicable

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h1>Callback Page</h1>
      {tokenData ? (
        <div>
          <h2>Access Token Data:</h2>
          <pre>{JSON.stringify(tokenData, null, 2)}</pre>
        </div>
      ) : (
        <p>Waiting for the OAuth process to complete...</p>
      )}
    </div>
  );
}

export default CallbackPage;
