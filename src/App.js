import React from "react";

function sendData() {
  const postData = {
    name: "John Doe",
    email: "johndoe@example.com",
    test: "Sample Test",
    endDate: "2023-06-30",
    uniqueId: "123456",
    isCompleted: "Yes",
  };

  const apiKey = "AIzaSyAz1z7QqYvovxmnO-lvzoORcMC1UZzXNRE"; // Replace with your actual API key
  const url = `https://script.google.com/macros/s/AKfycbxetRR_4zhcT6SVC9qpcJzOUPldFkOOLd8ZwPcnaFFYdM8lj_J_hYzvXkC_GxLuXj_0/exec?key=${apiKey}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Success message from the server
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

function App() {
  return (
    <div>
      <h1>Send Data to Google Sheet</h1>
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}

export default App;
