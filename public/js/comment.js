const newComment = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#addComment").value.trim();
  const postId = event.target.getAttribute("data-id");

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
    console.log(id);
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

const postComment = document.querySelector(".postCommentBtn");
if (postComment) {
  postComment.addEventListener("click", newComment);
}
const deleteBtn = document.querySelector("#deletePost");
const icon = document.querySelector(".icon");

if (deleteBtn) {
  if (icon) {
    deleteBtn.addEventListener("mouseover", function () {
      icon.classList.add(".hide");
    });
  }
  deleteBtn.addEventListener("click", deleteButtonHandler);
}

const deleteCommentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const deleteConfirm = confirm(
      "Are you sure you want to delete this comment"
    );
    if (!deleteConfirm) {
      return;
    }

    const id = event.target.getAttribute("data-id");
    console.log("this is the id: " + id);

    const response = await fetch(`/api/comments/dashboard/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("successful delete");
      location.reload();
    } else {
      alert("Failed to delete comment");
    }
  }
};

const delComment = document.querySelectorAll(".deleteComment");
for (let i = 0; i < delComment.length; i++) {
  delComment[i].addEventListener("click", deleteCommentHandler);
}
