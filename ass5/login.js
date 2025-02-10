const API_LOGIN_URL = "https://fakestoreapi.com/auth/login";
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(API_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    window.location.href = "index.html";
    
  } catch (error) {
    errorMessage.style.display = "block";
  }
});
