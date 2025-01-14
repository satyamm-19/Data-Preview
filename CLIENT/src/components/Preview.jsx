
import React from "react";
import { useNavigate } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    navigate("/");  // Redirect to the form if no data is found
    return null;
  }

  const backPage = async () => {
    // Handle data submission logic to backend here
    // After submission, navigate to success page
    navigate("/");
  };

  return (
    <div>
      <h1>Preview Your Data</h1>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Phone Number:</strong> {userData.phone}</p>
      {userData.image && <img src={userData.image} alt="Image Preview" width="200" />}
      
      <button onClick={backPage}>Back</button>
    </div>
  );
}

export default Preview;
