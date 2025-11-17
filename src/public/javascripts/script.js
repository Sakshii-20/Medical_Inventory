
function validateForm() {
    const userId = document.getElementById("userId").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;


    if (userId === "") {
        alert("User ID is required");
        return false;
    }

    if (username === "") {
        alert("Username is required");
        return false;
    }

    
    if (password === "") {
        alert("Password is required");
        return false;
    } else if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
    }


    if (email === "") {
        alert("Email is required");
        return false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }
    }

    if (role === "") {
        alert("Please select a role");
        return false;
    }

    return true;
}
  const params = new URLSearchParams(window.location.search);
  if (params.get("error") === "username") {
    alert("This username already exists. Please choose another.");
  } else if (params.get("error") === "userId") {
    alert("This User ID is already taken. Please try another.");
  } else if (params.get("error") === "unknown") {
    alert("⚠️ Something went wrong, please try again.");
  }

