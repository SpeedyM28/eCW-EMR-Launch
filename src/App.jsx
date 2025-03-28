import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tokenData, setTokenData] = useState(null); // Track token data in state
  const [patientData, setPatientData] = useState(null); // Track patient data in state

  const getAuthorizationCode = () => {
    const params = new URLSearchParams(window.location.search);
    console.log('here is the authorization code:', params.get('code'));
    return params.get('code'); // Extract the 'code' from the URL
  };

  const exchangeAuthorizationCodeForToken = async (code) => {
    const tokenEndpoint = 'https://launch.smarthealthit.org/v/r4/auth/token';
    
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code); // The code you received in the URL
    params.append('redirect_uri', 'https://your-github-pages-url.com/'); // Your redirect URI
    params.append('client_id', 'AjmnHUHBbfyIs8grLV3on7gT8pftZs4xh7tmqw7gemI'); // Your client ID
    params.append('client_secret', ''); // Your client secret

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(), // Send the params as URL-encoded form data
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }
  
    const data = await response.json();  // Parse the JSON response
    return data;  // Return the response containing the access token
  };

  const fetchPatientData = async (accessToken) => {
    const response = await fetch('https://launch.smarthealthit.org/v/r4/fhir/Patient', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch patient data');
      return;
    }

    const patientData = await response.json();
    console.log("patient data received:", patientData);
    setPatientData(patientData); // Store the patient data in state
  };

  // Handle authorization and token exchange when the component mounts
  useEffect(() => {
    const code = getAuthorizationCode();  // Get the code from the URL

    if (code) {
      exchangeAuthorizationCodeForToken(code)
        .then((data) => {
          console.log('successful EMR launch, All received data:', data);
          setTokenData(data);  // Store token data in state
          fetchPatientData(data.access_token);  // Fetch patient data with the access token
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('Authorization code not found in the URL.');
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      {tokenData && <p>Token received: {tokenData.access_token}</p>}
      {patientData ? (
        <div>
          <h3>Patient Data:</h3>
          <pre>{JSON.stringify(patientData, null, 2)}</pre> {/* Render patient data */}
        </div>
      ) : (
        <p>Loading patient data...</p>
      )}
    </div>
  );
}

export default App;