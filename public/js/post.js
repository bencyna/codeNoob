const postModal = document.getElementById("postModal");

const newPost = document.getElementById("addModalBtn");

const closePostModalBtn = document.getElementById("closePostModal");

document.addEventListener("click", function (event) {
  if (event.target !== newPost) {
    return;
  }
  postModal.classList.add("is-active");
});

const newFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#post-name").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  const clueless = document.querySelector(".Clueless");
  const CSS = document.querySelector(".CSS");
  const js = document.querySelector(".JavaScript");
  let checked;

  if (clueless.checked) {
    checked = "0fbabb07-aeb0-4082-9264-ffeadce95600";
  } else if (CSS.checked) {
    checked = "971fdc2e-a28a-4c1b-bf68-c36c41931282";
  } else if (js.checked) {
    checked = "f814f70a-0afe-458f-a79e-49e3cd97d01c ";
  }

  console.log(checked);

  console.log(title + content);

  if (title && content) {
    const response = await fetch(`/api/posts/dashboard`, {
      method: "POST",
      body: JSON.stringify({ title, content, checked }),
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
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    document.location.replace(`/post/${id}`);
  }
};
const singPost = document.querySelectorAll(".postLink");
for (let i = 0; i < singPost.length; i++) {
  singPost[i].addEventListener("click", goToPost);
}

const post = document.querySelector(".postBtn");
if (post) {
  post.addEventListener("click", newFormHandler);
}

closePostModalBtn.addEventListener("click", function () {
  postModal.classList.remove("is-active");
});
