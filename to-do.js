document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const errorMessage = document.getElementById('error-message');

  addTaskBtn.addEventListener('click', addTask);
  taskList.addEventListener('click', handleTaskListClick);

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
      const taskItem = createTaskItem(taskText);
      taskList.appendChild(taskItem);
      taskInput.value = '';
      errorMessage.textContent = '';
    } else {
      errorMessage.textContent = 'Please enter a task.';
    }
  }

  function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = taskText;
    taskInput.addEventListener('keydown', handleTaskInputKeydown);
    taskItem.appendChild(taskInput);

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
    taskItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    taskItem.appendChild(deleteButton);

    return taskItem;
  }

  function handleTaskInputKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  }

  function handleTaskListClick(event) {
    if (event.target.classList.contains('edit-btn')) {
      const taskItem = event.target.parentNode;
      const taskInput = taskItem.querySelector('input[type="text"]');
      const editButton = taskItem.querySelector('.edit-btn');
      const deleteButton = taskItem.querySelector('.delete-btn');

      taskInput.disabled = false;
      taskInput.focus();
      editButton.textContent = 'Save';
      editButton.classList.add('save-btn');
      deleteButton.style.display = 'none';
    } else if (event.target.classList.contains('save-btn')) {
      const taskItem = event.target.parentNode;
      const taskInput = taskItem.querySelector('input[type="text"]');
      const editButton = taskItem.querySelector('.edit-btn');
      const deleteButton = taskItem.querySelector('.delete-btn');

      taskInput.disabled = true;
      editButton.textContent = 'Edit';
      editButton.classList.remove('save-btn');
      deleteButton.style.display = 'inline';
    } else if (event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.parentNode;
      taskList.removeChild(taskItem);
    }
  }
});
