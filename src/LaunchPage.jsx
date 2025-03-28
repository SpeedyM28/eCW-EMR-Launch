// LaunchPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LaunchPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // You may need to handle the logic for initiating OAuth here
    // For now, we can just redirect to the callback URL for testing
    console.log("Launch page initiated");

    // Simulating redirection to callback
    navigate("/callback");
  }, [navigate]);

  return (
    <div>
      <h1>Launch Page</h1>
      <p>Redirecting to the authentication page...</p>
    </div>
  );
}

export default LaunchPage;