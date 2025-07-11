document.getElementById("loginForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("loggedInUser", JSON.stringify({ email: data.email, token: data.token }));
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert(data.error || "Login failed.");
  }
});

document.getElementById("registerForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registration successful. You can now log in.");
    window.location.href = "login.html";
  } else {
    alert(data.error || "Registration failed.");
  }
});
