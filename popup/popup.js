const promptTMPL = document.getElementById("prompt-tmpl").content;
const container = document.getElementById("container");
const newPrompt = document.getElementById("new-prompt");

const exemplePrompt = {
  name: "Title",
  content: "prompt",
};

window.addEventListener("load", loadPrompt);
newPrompt.addEventListener("click", newPromptHandle);
document.getElementById("filter").addEventListener("input", filterHandle);

function loadPrompt() {
  let savedPrompt = localStorage.getItem("Prompt");
  populateWindow(JSON.parse(savedPrompt));
}

function savePrompt() {
  let savedPrompt = new Array();
  Array.from(document.querySelectorAll(".prompt")).forEach((div) => {
    savedPrompt.push({
      name: div.querySelector(".name").value,
      content: div.querySelector(".content").value,
    });
  });
  localStorage.setItem("Prompt", JSON.stringify(savedPrompt));
}

function newPromptHandle() {
  populateWindow([exemplePrompt], true);
}

function populateWindow(prompts, editable = false) {
  if (prompts === null) {
    return;
  }
  for (let prompt of prompts) {
    let div = promptTMPL.cloneNode(true);
    div.querySelector(".name").value = prompt.name;
    div.querySelector(".content").value = prompt.content;
    div.querySelector(".edit").addEventListener("click", editHandle);
    div.querySelector(".copy").addEventListener("click", copyHandle);
    div.querySelector(".delete").addEventListener("click", deleteHandle);
    editable ? div.querySelector(".edit").click() : null;
    container.insertBefore(div, newPrompt);
  }
}

function editHandle() {
  const textArea = this.parentNode.parentNode.querySelector(".content");
  const nameArea = this.parentNode.parentNode.querySelector(".name");
  textArea.disabled = !textArea.disabled;
  nameArea.disabled = !nameArea.disabled;
  this.textContent = textArea.disabled ? "Edit" : "Save";
  this.classList.toggle("edit-mode");
  textArea.classList.toggle("edit-mode");
  nameArea.classList.toggle("edit-mode");
  textArea.disabled ? savePrompt() : null;
}

function copyHandle() {
  const textArea = this.parentNode.parentNode.querySelector(".content");
  navigator.clipboard.writeText(textArea.value);
}

function deleteHandle() {
  this.parentNode.parentNode.remove();
  savePrompt();
}

function filterHandle() {
  let pat = new RegExp(this.value.trim(), "gi");
  Array.from(document.querySelectorAll(".prompt")).forEach((prompt) => {
    if (
      prompt.querySelector(".name").value.match(pat) ||
      prompt.querySelector(".content").value.match(pat)
    ) {
      prompt.style.display = "flex";
    } else {
      prompt.style.display = "none";
    }
  });
}
