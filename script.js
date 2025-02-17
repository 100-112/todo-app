document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    // Create a new task item
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = taskText;
    span.addEventListener("click", function () {
        span.classList.toggle("completed");
        updateLocalStorage();
    });

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function () {
        let newText = prompt("Edit task:", span.textContent);
        if (newText) {
            span.textContent = newText;
            updateLocalStorage();
        }
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        updateLocalStorage();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    updateLocalStorage();

    // Clear input
    taskInput.value = "";
}

// Save tasks to local storage
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach(task => {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    storedTasks.forEach(task => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add("completed");
        }
        span.addEventListener("click", function () {
            span.classList.toggle("completed");
            updateLocalStorage();
        });

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = function () {
            let newText = prompt("Edit task:", span.textContent);
            if (newText) {
                span.textContent = newText;
                updateLocalStorage();
            }
        };

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            li.remove();
            updateLocalStorage();
        };

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Clear all tasks
function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        document.getElementById("taskList").innerHTML = "";
        localStorage.removeItem("tasks");
    }
}
