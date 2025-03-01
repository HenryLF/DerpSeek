const promptTMPL = document.getElementById("prompt-tmpl").content;
const container = document.getElementById("container");
const newPrompt = document.getElementById("new-prompt");

let exemplePrompt = {
  name: "PlaceHolder",
  content: "PlaceHolder",
};

window.addEventListener("load", loadPrompt);

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

newPrompt.addEventListener("click", newPromptHandle);
function newPromptHandle() {
  populateWindow([exemplePrompt]);
}

function populateWindow(prompts) {
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
console.log(window);
