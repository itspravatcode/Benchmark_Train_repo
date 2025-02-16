const API_LOGIN_URL: string = "https://fakestoreapi.com/auth/login";

const loginForm = document.getElementById("login-form") as HTMLFormElement;
const errorMessage = document.getElementById("error-message") as HTMLElement;

loginForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();

  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  const username: string = usernameInput.value;
  const password: string = passwordInput.value;

  try {
    const response: Response = await fetch(API_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data: { token: string } = await response.json();
    localStorage.setItem("authToken", data.token);
    window.location.href = "/index.html"; 
  } catch (error) {
    errorMessage.style.display = "block";
  }
});
