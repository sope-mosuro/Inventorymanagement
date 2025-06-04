

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login_auth");
  const changePwdForm = document.getElementById("chgpassword");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      login();
    });
  }

  if (changePwdForm) {
    changePwdForm.addEventListener("submit", function (event) {
      event.preventDefault();
      changepassword();
    });
  }

});



//  LOGIN FUNCTION

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Sending login request to backend...");
  try {
    const response = await fetch("/api/auth/login", {
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
                    window.location.href = "/src/admin/index.html";
                } else if (roles.includes("ROLE_SALES_REP")) {
                    window.location.href = "/src/user/index.html";
                } else {
                    window.location.href = "/unauthorized.html";
                }
        }     catch (error) {
                  console.error("Error:", error.message);
        }
}


// CHANGE PASSWORD FUNCTION

   async function changepassword() {
     const currentPassword = document.getElementById("currentPassword")?.value.trim();
     const newPassword = document.getElementById("newPassword")?.value.trim();
     const confirmPassword = document.getElementById("confirmPassword")?.value.trim();

     if (!currentPassword || !newPassword || !confirmPassword) {
       alert("Please fill in all password fields.");
       return;
     }

     if (newPassword !== confirmPassword) {
       alert("New password and confirmation do not match.");
       return;
     }

     const payload = {
       currentPassword,
       newPassword,
       confirmPassword
     };

     try {
       const response = await fetch("/api/auth/changepassword", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(payload)

       });
       const responsebody = response.json();

       console.log("Response:", responsebody);

       if (!response.ok) {
         throw new Error("Change password failed");
       }

       alert("Password changed successfully");

     } catch (err) {
       console.error("Password change error:", err);
       alert("Password change failed: " + err.message);
     }
   }


   function togglePassword(inputId, toggleElement) {
     const input = document.getElementById(inputId);
     const isPassword = input.type === "password";
     input.type = isPassword ? "text" : "password";
     toggleElement.textContent = isPassword ? "&#x1F512;" : "&#x1F513;";
   }


