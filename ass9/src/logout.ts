const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "/src/login.html";
  });
}
