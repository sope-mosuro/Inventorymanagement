

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Sending login request to backend...");
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include", // Allows cookies for authentication
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
   if (!response.ok) {
         throw new Error("Login failed: Invalid credentials or server error.");
       }
       const data = await response.json();
       if (!data.token) {
         throw new Error("No token received from the backend.");
       }
       // Decode JWT
       console.log(data.token,"encoded token")
       const decodedToken = jwt_decode(data.token);
       console.log("Decoded Token:", decodedToken);
    //extract roles
    const roles = decodedToken.roles
      if (roles.includes("ROLE_ADMIN")) {
                    window.location.href = "http://localhost:8080";
                } else if (roles.includes("ROLE_SALES_REP")) {
                    window.location.href = "/sales-dashboard.html";
                } else {
                    window.location.href = "/unauthorized.html";
                }
        }     catch (error) {
                  console.error("Error:", error.message);
        }   }

document.getElementById("login_auth").addEventListener("submit", function (event) {
      event.preventDefault();
      login();
    });

