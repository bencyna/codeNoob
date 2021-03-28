// Get the modal
const modal = document.getElementById("loginModal");

// Get the button that opens the modal
const logBtn = document.getElementById("loginButt");

// Get the <span> element that closes the modal
const closeLoginModalBtn = document.getElementById("closeLoginModal");

// When the user clicks the button, open the modal
logBtn.addEventListener("click", function () {
  modal.classList.toggle("is-active");
});

// When the user clicks on <span> (x), close the modal
closeLoginModalBtn.addEventListener("click", function () {
  modal.classList.toggle("is-active");
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    console.log(modal);
    modal.style.display = "none";
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log(email + password);
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log(response);

      document.location.replace("/dashboard");
    } else {
      console.log("Failed to log in");
    }
  }
};

document.querySelector(".loginBtn").addEventListener("click", loginFormHandler);
