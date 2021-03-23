<<<<<<< HEAD
const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("hello");
  const title = document.querySelector("#post-name").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  console.log(title + content);

  if (title && content) {
    const response = await fetch(`/api/posts/dashboard`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.reload();
    }
  }
};

const deleteButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`api/posts/x/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

document.querySelector(".postBtn").addEventListener("click", newFormHandler);
document
  .querySelector("#deletePost")
  .addEventListener("click", deleteButtonHandler);
=======
async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
>>>>>>> aa625310a51c951e24e61b0d261bb5b744a24110
