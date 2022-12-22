const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
const elSpanError = document.querySelector(".js-error");
const elAllBtn = document.querySelector(".js-all-btn");
const elAllSpan = document.querySelector(".js-all-span");
const elFinishedBtn = document.querySelector(".js-finished-btn");
const elFinishedSpan = document.querySelector(".js-finished-span");
const elPendingBtn = document.querySelector(".js-pending-btn");
const elPendingSpan = document.querySelector(".js-pending-span");

let todos = [];

function renderTodo(array, node) {
  node.innerHTML = "";
  array.forEach((el) => {
    let newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("class", "form-check-input js-check");
    newCheckbox.dataset.todoId = el.id;

    const newSpan = document.createElement("span");
    newSpan.setAttribute(
      "class",
      "ms-2 js-span bg-light shadow-sm p-1 rounded"
    );
    newSpan.dataset.todoId = el.id;

    const newLi = document.createElement("li");
    newLi.setAttribute("class", "list-group-item d-flex align-items-center");

    const newEditButton = document.createElement("button");
    newEditButton.setAttribute(
      "class",
      "btn btn-success ms-auto me-2 js-edit-btn fa-regular p-3 fs-5 fa-pen-to-square"
    );
    newEditButton.dataset.todoId = el.id;

    const newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute(
      "class",
      "btn btn-danger js-delete-btn p-3 fs-5 fa-regular fa-trash-can"
    );
    newDeleteButton.dataset.todoId = el.id;

    newSpan.textContent = el.text;
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newSpan);
    newLi.appendChild(newEditButton);
    newLi.appendChild(newDeleteButton);

    if (el.isCompleted) {
      newCheckbox.checked = true;
      newSpan.style.textDecoration = "line-through";
    }
    node.appendChild(newLi);

    elAllSpan.textContent = todos.length;
  });
}

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  if (elInput.value === "") {
    // alert("Please enter at least one word :(");
    elInput.classList.toggle("error");
    return false;
  } else if (elInput.value.length <= 2) {
    elSpanError.classList.remove("d-none");
    return false;
  } else {
    elSpanError.classList.add("d-none");
    elInput.classList.remove("error");
  }

  elList.textContent = "";

  let elInputValue = elInput.value;

  //* --------------------------------
  const todoObj = {
    id: todos.length + 1,
    text: elInputValue,
    isCompleted: false,
  };
  todos.push(todoObj);
  //* ---------------------------------

  renderTodo(todos, elList);
  elInput.value = "";

  //*----------------  Localstorage
  // localStorage.setItem("user", JSON.stringify(todos));
  // localStorage.getItem("user");
});

//*---------------- Localstorage
// todos = JSON.parse(localStorage.getItem("user"));
// renderTodo(todos, elList);
//*---------------- Localstorage

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-delete-btn")) {
    const getId = evt.target.dataset.todoId;
    const foundIndex = todos.findIndex((el) => el.id == getId);
    // console.log(foundIndex);
    todos.splice(foundIndex, 1);
    renderTodo(todos, elList);
  }

  if (evt.target.matches(".js-edit-btn")) {
    const getId = evt.target.dataset.todoId;
    const foundIndex = todos.findIndex((el) => el.id == getId);
    // console.log(foundIndex);
    let prompted = prompt(
      "You're about to change your tasks?",
      todos[foundIndex].text
    );
    todos[foundIndex].text = prompted;
    if (prompted) {
    } else {
      return;
    }
    renderTodo(todos, elList);
  }

  if (evt.target.matches(".js-check")) {
    const getId = evt.target.dataset.todoId;
    const foundIndex = todos.findIndex((el) => el.id == getId);
    todos[foundIndex].isCompleted = !todos[foundIndex].isCompleted;

    let finished = todos.filter((item) => item.isCompleted == true);

    console.log(finished.length);
    elFinishedSpan.textContent = finished.length;
    elPendingSpan.textContent =
      elAllSpan.textContent - elFinishedSpan.textContent;
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-span")) {
    const getId = evt.target.dataset.todoId;
    const foundIndex = todos.findIndex((el) => el.id == getId);
    let prompted = prompt(
      "You're about to change your tasks ?",
      todos[foundIndex].text
    );
    todos[foundIndex].text = prompted;
    if (prompted) {
    } else {
      return;
    }
    renderTodo(todos, elList);
  }
});
