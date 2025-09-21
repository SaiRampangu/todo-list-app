
//**********your code starts here*******

let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");
let saveTodoButtonEl = document.getElementById("saveTodoButton");


function getListfromLocalStorage(){
  let todoListFromLocalStorage = JSON.parse(localStorage.getItem("todoList"));
  if (todoListFromLocalStorage === null){
    return[];
  }else{
    return todoListFromLocalStorage;
  }
}

let todoList = getListfromLocalStorage();
let todoCount = todoList.length;
saveTodoButtonEl.onclick = function(){
  let stringifiedTodoList = JSON.stringify(todoList);
  localStorage.setItem("todoList", stringifiedTodoList);
  alert("Your todos have been saved!");
  console.log(todoList);
}

function onDeleteTodo(todoId){
  let todoElement = document.getElementById(todoId);
  todoItemsContainerEl.removeChild(todoElement);
  for (let todo of todoList){
    if (todoId === "todo" + todo.uniqueNo){
      let deleteIndex = todoList.indexOf(todo);
      todoList.splice(deleteIndex, 1);
    }
  }
}

function ontodostatusChange(labelId, checkboxId, todoId){
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  let todoElement = document.getElementById(todoId);

  if (checkboxElement.checked === true){
    labelElement.classList.add("checked");
  } else {
    labelElement.classList.remove("checked");
  }
  let todoObjectIndex = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId){
      return true;
    }else{
      return false;
    }
  });
  let todoObject = todoList[todoObjectIndex];
  if (todoObject.isChecked === true){
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}
function createAndAppendTodo(todo){
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainerEl.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.classList.add("checkbox-input");
  inputElement.checked = todo.isChecked;

  inputElement.onclick = function(){
    ontodostatusChange(labelId, checkboxId, todoId);
  }
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked === true){
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function(){
    onDeleteTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);

}
for (let todo of todoList){
    createAndAppendTodo(todo);
}

function onAddtodo(){
  let userInputEl = document.getElementById("todoUserInput");
  let userInputValue = userInputEl.value;
  if (userInputValue === ""){
    alert("Enter valid text");
    return;
  }
  todoCount = todoCount + 1;
  console.log(todoCount);
  // create a todo object
  let newTodo = {
    text: userInputValue,
    uniqueNo: todoCount,
    isChecked: false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputEl.value = "";
}
addTodoButtonEl.onclick = function(){
  onAddtodo();
}