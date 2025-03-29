// LaunchPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function LaunchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("Launch page initiated");

    const iss = searchParams.get("iss");
    const launch = searchParams.get("launch");

    if (!iss) {
      console.error("Missing 'iss' parameter. Cannot proceed.");
      return;
    }

    console.log("Issuer (iss):", iss);
    console.log("Launch context:", launch);

    // Store values for later use
    localStorage.setItem("iss", iss);
    if (launch) localStorage.setItem("launch", launch);

    // Proceed to fetch metadata from RS
    fetchMetadata(iss);
  }, [searchParams]);

  const fetchMetadata = async (iss) => {
    try {
      const metadataUrl = `${iss}/metadata`;
      console.log("Fetching metadata from:", metadataUrl);

      const response = await fetch(metadataUrl);
      if (!response.ok) throw new Error(`Failed to fetch metadata: ${response.statusText}`);

      const metadata = await response.json();
      console.log("Received metadata:", metadata);

      // Store relevant metadata
      localStorage.setItem("auth_endpoint", metadata.authorization_endpoint);
      localStorage.setItem("token_endpoint", metadata.token_endpoint);

      // Redirect to authentication
      //navigate("/callback");
    } catch (error) {
      console.error("Error retrieving metadata:", error);
    }
  };

  return (
    <div>
      <h1>Launch Page</h1>
      <p>Redirecting to the authentication page...</p>
    </div>
  );
}

export default LaunchPage;