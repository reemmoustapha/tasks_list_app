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
taskInput.addEventListener('keydown', handleKeyPress);

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);



var filterButtons = document.querySelectorAll('.filter-buttons .filter-btn');
filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var filter = button.dataset.filter;
        var tasks = taskList.querySelectorAll('li');

        tasks.forEach(function(task) {
            if (filter === 'all') {
                task.style.display = '';
            } else if (filter === "completed") {
                   if (task.classList.contains("completed")){
                       task.style.display = "flex";
                   } else {
                       task.style.display = "none";
                   }
               } else if (filter === "pending") {
                   if (!task.classList.contains("completed")){
                        task.style.display = "flex";
                   } else {
                       task.style.display = "none";
                   }
            }
        });
    });
});




function saveTaskToLocalStorage() {
    var tasks = Array.from(taskList.querySelectorAll('li')).map(function(li) {
        return {
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    savedTasks.forEach(function(task) {
        createTask(task.text, task.completed); 
    });
}


function createTask(taskText, completed) {
    var li = document.createElement('li');
    li.innerHTML =`
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;
     
    var checkbox = li.querySelector(".checkbox");
    var editBtn = li.querySelector(".edit-btn");
    var deleteBtn = li.querySelector(".delete-btn");

    if (completed) {
        checkbox.checked = true;
        li.classList.add('completed');
        editBtn.disabled = true;
    }

    function toggleTaskStatus() {
        if (checkbox.checked) {
            li.classList.add('completed');
            editBtn.disabled = true;
        } else {
            li.classList.remove('completed');
            editBtn.disabled = false;
        }
        saveTaskToLocalStorage();
    }

    function editTask() {
        if (!checkbox.checked) {
            taskInput.value = li.querySelector("span").textContent;
            li.remove();
            saveTaskToLocalStorage();
        }
    }

    function deleteTask() {
        li.remove();
        saveTaskToLocalStorage();
    }

    checkbox.addEventListener('change', toggleTaskStatus);
    editBtn.addEventListener('click', editTask);
    deleteBtn.addEventListener('click', deleteTask);

    taskList.appendChild(li);
}


function addTask(event) {
    event.preventDefault();
    var taskText = taskInput.value.trim();
    if (!taskText) return;

    createTask(taskText, false);
    taskInput.value = '';
    saveTaskToLocalStorage();
}


function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask(event);
    }
}


