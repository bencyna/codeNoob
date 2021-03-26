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

document.querySelector(".postCommentBtn").addEventListener("click", newComment);
