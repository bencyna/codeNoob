async function signupFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const firstName = document.querySelector("#first-name-signup").value.trim();
  const lastName = document.querySelector("#last-name-signup").value.trim();

  if (email && password && firstName && lastName) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("success");
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}
document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
