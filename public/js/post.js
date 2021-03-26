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

const goToPost = async (event) => {
  event.preventDefault();
  console.log("workinh");
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    document.location.replace(`/api/posts/${id}`);
  }
};

document.querySelector(".postLink").addEventListener("click", goToPost);
document.querySelector(".postBtn").addEventListener("click", newFormHandler);
