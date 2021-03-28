const signModal = document.getElementById("signModal");

// Get the button that opens the modal
const signBtn = document.getElementById("signButt");

const closeSignupModalBtn = document.getElementById("closeSignupModal");

const commentSignup = document.getElementById("signUpComment");

// When the user clicks the button, open the modal
document.addEventListener("click", function (event) {
  if (event.target !== signBtn && event.target !== commentSignup) {
    return;
  }
  signModal.classList.add("is-active");
});

// When the user clicks on <span> (x), close the modal
closeSignupModalBtn.addEventListener("click", function () {
  signModal.classList.remove("is-active");
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == signModal) {
    signModal.classList.remove("is-active");
    signModal.style.display = "none";
  }
};

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
      alert(
        "you have successfully signed up! Login to use all the cool features!"
      );
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
