var NewTaskButton = document.getElementById("new-task-btn");
var New = document.getElementById("new");

function toggleForm() {
  New.classList.toggle("hide");

 
}

NewTaskButton.addEventListener("click", toggleForm);
