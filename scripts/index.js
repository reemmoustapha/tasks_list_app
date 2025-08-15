var NewTaskButton = document.getElementById("new-task-btn");
var New = document.getElementById("new");


function toggleForm() {
  New.classList.toggle("hide");

 
}

NewTaskButton.addEventListener("click", toggleForm);

var taskInput = document.getElementById('task-input');
var addTaskBtn = document.getElementById('add-task-btn');
var taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', handleKeyPress);

function addTask(event) {
    event.preventDefault();
    var taskText = taskInput.value.trim();
    if (!taskText) {
        
        return;
    }

    
    var li = document.createElement('li');
    li.innerHTML =`
    <input type ="checkbox" class="checkbox">
    <span>${taskText}</span>
    <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
    `;
     
    var checkbox = li.querySelector(".checkbox");
    var editBtn =li.querySelector(".edit-btn");
    var deleteBtn = li.querySelector(".delete-btn")

   

    function toggleTaskStatus() {
    if (checkbox.checked) {
        li.classList.add('completed');
        editBtn.disabled = true;
    } else {
        li.classList.remove('completed');
        editBtn.disabled = false;
    }
}

    function editTask() {
        if (!checkbox.checked) {
            taskInput.value = li.querySelector("span").textContent;
            li.remove();
        }
    }

    function deleteTask() {
        li.remove();
    }

    checkbox.addEventListener('change', toggleTaskStatus);
    editBtn.addEventListener('click', editTask);
    deleteBtn.addEventListener('click', deleteTask);

    taskList.appendChild(li);
    taskInput.value = '';
}




    

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask(event);
    }
}








