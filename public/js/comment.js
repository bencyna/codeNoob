const newComment = async (event) => {
  event.preventDefault();

  console.log("hello");
  const content = document.querySelector("#addComment").value.trim();
  const postId = event.target.getAttribute("data-id");

  console.log(content);
  console.log(postId);

  if (content) {
    const response = await fetch(`/api/comments/dashboard`, {
      method: "POST",
      body: JSON.stringify({ postId, content }),
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
    const deleteConfirm = confirm("Are you sure you want to delete this post");
    if (!deleteConfirm) {
      return;
    }

    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("successful delete");
      window.location.replace("/dashboard");
    } else {
      alert("Failed to delete Post");
    }
  }
};

document.querySelector(".postCommentBtn").addEventListener("click", newComment);
document
  .querySelector("#deletePost")
  .addEventListener("click", deleteButtonHandler);
