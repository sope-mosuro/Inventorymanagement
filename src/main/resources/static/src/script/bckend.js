async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Sending login request to backend...");

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include", // for cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
  } catch (error) {
    alert("error" + error.message);
  }
  alert("login succesful")
  console.log("Login successful");
}

document
  .getElementById("login_auth")
  .addEventListener("submit", function (event) {
    login();
    event.preventDefault();
    
  });
