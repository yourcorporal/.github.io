document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTask');
    const clearListButton = document.getElementById('clearList');
  
    let tasks = loadTasks();
  
    renderTasks();
  
    addTaskButton.addEventListener('click', () => {
      const taskText = newTaskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        renderTasks();
        newTaskInput.value = '';
        saveTasks();
      }
    });
  
    taskList.addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const li = event.target.parentNode;
        tasks = tasks.map(task =>
          task.text === li.querySelector('span').textContent ?
            { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
  
      } else if (event.target.tagName === 'BUTTON') {
        const li = event.target.parentNode;
        const taskText = li.querySelector('span').textContent;
        tasks = tasks.filter(task => task.text !== taskText);
        renderTasks();
        saveTasks();
  
      }
    });
  
  
    clearListButton.addEventListener('click', () => {
      tasks = [];
      renderTasks();
      saveTasks();
    });
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        const span = document.createElement('span');
        span.textContent = task.text;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeButton);
        if (task.completed) {
          li.classList.add('completed');
        }
        taskList.appendChild(li);
      });
    }
  
    function loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
