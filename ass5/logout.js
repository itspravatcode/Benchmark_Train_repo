document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
  });
  