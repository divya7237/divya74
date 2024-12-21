// Get necessary elements from the DOM
const taskInput = document.getElementById("task-input");
const taskTime = document.getElementById("task-time");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const clearCompletedButton = document.getElementById("clear-completed-btn");

// Function to create a new task
function createTask(taskText, taskDateTime) {
  const li = document.createElement("li");
  li.classList.add("task");

  const taskContent = document.createElement("span");
  taskContent.classList.add("task-text");
  taskContent.textContent = `${taskText} - Due: ${taskDateTime}`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-btn");

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.classList.add("complete-btn");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");

  // Add functionality to buttons
  editButton.onclick = () => editTask(li, taskText, taskDateTime);
  completeButton.onclick = () => completeTask(li);
  deleteButton.onclick = () => deleteTask(li);

  // Append elements to the li
  li.appendChild(taskContent);
  li.appendChild(editButton);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  // Add task to the list
  taskList.appendChild(li);
}

// Add task when clicking "Add Task" button
addTaskButton.onclick = () => {
  const taskText = taskInput.value;
  const taskDateTime = taskTime.value;

  if (taskText && taskDateTime) {
    createTask(taskText, taskDateTime);
    taskInput.value = ""; // Clear input field
    taskTime.value = ""; // Clear datetime field
  } else {
    alert("Please enter both task and date/time.");
  }
};

// Mark task as completed
function completeTask(taskItem) {
  taskItem.classList.toggle("completed");
}

// Edit task
function editTask(taskItem, oldText, oldDateTime) {
  const newText = prompt("Edit task description:", oldText);
  const newDateTime = prompt("Edit task due date/time:", oldDateTime);

  if (newText && newDateTime) {
    taskItem.querySelector(".task-text").textContent = `${newText} - Due: ${newDateTime}`;
  }
}

// Delete task
function deleteTask(taskItem) {
  taskItem.remove();
}

// Clear completed tasks
clearCompletedButton.onclick = () => {
  const completedTasks = document.querySelectorAll(".completed");
  completedTasks.forEach(task => task.remove());
};

