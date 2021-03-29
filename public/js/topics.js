const goToTopic = async (event) => {
  event.preventDefault();
  console.log("working");
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    document.location.replace(`topics/${id}`);
  }
};

const singTopic = document.querySelectorAll(".topicClick");
for (let i = 0; i < singTopic.length; i++) {
  singTopic[i].addEventListener("click", goToTopic);
}
