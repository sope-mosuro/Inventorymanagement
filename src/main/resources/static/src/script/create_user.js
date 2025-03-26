// Store the decoded token globally to avoid multiple decodings
let decodedToken = null;

// Function to get and decode the JWT token from cookies
//function getDecodedToken() {
//    if (!decodedToken) {
//        const token = getCookie("JWT_TOKEN"); // Retrieve the token from cookies
//        if (token) {
//            decodedToken = jwt_decode(token); // Decode the token
//        }
//    }
//    return decodedToken;
//}

// Function to create a new user (only accessible to admins)
async function create_user(event) {
    event.preventDefault(); // Prevent page reload

//    const adminDetails = getDecodedToken();
//    console.log(adminDetails)
//    if (adminDetails.roles !== "ROLE_ADMIN") {
//        console.error("Only admins can create users!");
//        alert("Unauthorized: Only admins can create users.");
//        return;
//    }

    // Collect user input
//    const userData = {
//         name: document.getElementById("name1").value,
//        email: document.getElementById("email1").value,
//        password: document.getElementById("password1").value,
//        role: document.getElementById("role1").value, // Assuming you have a dropdown or input for role
//    };
//
//    try {
//        const response = await fetch("http://localhost:8080/api/admin/create-user", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json",
//                "Authorization": `Bearer ${getCookie("JWT_TOKEN")}` // Send the token for authentication
//            },
//            body: JSON.stringify(userData),
//            credentials: "include" // Ensures cookies are sent with the request
//        });
//
//        if (!response.ok) {
//            throw new Error(`Failed to create user: ${response.statusText}`);
//        }
//
//        const result = await response.json();
//        console.log("User created successfully:", result);
//        alert("User created successfully!");

//    } catch (error) {
//        console.error("Error creating user:", error);
//        alert("Error creating user. Check console for details.");
//    }
//}

// Function to get cookie value by name
//function getCookie(name) {
//    const value = `; ${document.cookie}`;
//    const parts = value.split(`; ${name}=`);
//    if (parts.length === 2) return parts.pop().split(";").shift();
//    return null;
//}

// Attach event listener (ensure this runs after the DOM is loaded)
document.getElementById("create_user").addEventListener("submit",   alert("User created successfully!"););
