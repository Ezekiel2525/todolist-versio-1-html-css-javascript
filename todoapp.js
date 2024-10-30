const addTaskForm = document.querySelector("#addTaskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");


const createTaskItem = (task) => 
  `<li class="listitem">
        <input type="checkbox" onChange="toggleCompletion(event)" name="task" value="${task}"/>
        <label for="task">${task}</label>
        <button class="edbtn" type="button" onClick="removeTask(event)">X</button>
    </li>`


taskList.style = `
    list-style: none;
    margin-top: 35px ;
`



const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = () => {
  storedTasks.forEach((task) => {
    taskList.insertAdjacentHTML("beforeend", createTaskItem(task));
  });
};

window.onload = renderTasks;

const addTask = (event) => {
    event.preventDefault();

    const task = taskInput.value;
    const taskItem = createTaskItem(task);
    taskList.insertAdjacentHTML('beforeend', taskItem);
    storedTasks.push(task); 
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    addTaskForm.reset();
};

addTaskForm.addEventListener('submit', addTask);


const toggleCompletion = (event) => {
    const taskItem =  event.target.parentElement;
    const task = taskItem.querySelector('label');
    if(event.target.checked){
        task.style.textDecoration = 'line-through';
    }else{
        task.style.textDecoration = 'none';
    }
}

const removeTask = (event) => {
    const taskItem = event.target.parentElement;
    const task = taskItem.querySelector('label').innerText;

    const indexOfTask = task.indexOf(task);
    storedTasks.splice(indexOfTask, 1);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    taskItem.remove();
}
