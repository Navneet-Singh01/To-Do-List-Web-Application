const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#task");
const tasksListContainer = document.querySelector(".list");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
const clearButton = document.querySelector(".clear");

// intialize a variable taskCount to keep track of number of tasks
let taskCount = 0;

// update current count of tasks
const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

// to keep track of no. of tasks
let tasks = [];


const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  // if input field is empty of contain space, it shows error
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }
 
  // if input field contain text
  const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>`;
    tasksListContainer.insertAdjacentHTML("beforeend", task);

  // todo: make the clear button visible on add button click otherwise hide.

  // TODO: IMP : make it seperate function so that it can call from window.onload also
  const clearButton = document.querySelector(".clear");
  clearButton.style.display = "block"; // Show the clear button

  // todo: add fuctionality to clear button

  //Update the tasks array
  tasks.push(taskName);
  //Save tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";

  const taskId = tasks.length; // Unique identifier for the task

  deleteButtonListeners();// Set up delete button event listeners after adding a new task

// edit the Task
editButtonListeners();// Set up edit button event listeners after adding a new task

// checkmark the Task
checkmarkListeners();// Set up edit button event listeners after adding a new task

}

addBtn.addEventListener("click", addTask);

const deleteButtonListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button, index) => {
    button.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });
};

const editButtonListeners = ()=>{
  const editButton = document.querySelectorAll(".edit");
  editButton.forEach((editBtn,index) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) { // may be it click on the icon not on the button
        targetElement = e.target.parentElement; // so set the reference to button 
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText; //The ?. optional chaining operator ensures that if there is no previous sibling, it won't throw an error, and the value will be undefined.
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);

      // removing the taskName from the tasks array
      tasks.splice(index,1)
      localStorage.setItem('tasks',JSON.stringify(tasks)); // Save tasks to localStorage, updating the localStorage

    };
  });
}

const checkmarkListeners=()=>{
  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
};

clearButton.addEventListener("click", () => {
  tasks.length=0; // empty the tasks array
    //Save tasks to localStorage
    // localStorage.setItem("tasks", JSON.stringify(tasks)); // key-value pair found ie., key= task and value=[] emplty array
  localStorage.clear(); // no key-value pair found
  taskCount = 0;
  displayCount(taskCount);
  // let tasksListContainer = document.querySelector(".task")
  // tasksListContainer.remove()
  const tasksListContainer = document.querySelectorAll(".task");
  tasksListContainer.forEach((task) => {
    task.remove();
  });
});

// Page reload:

window.onload = () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Populate tasksContainer with tasks from localStorage
  tasks.forEach((taskName) => {
    const task = `<div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskname">${taskName}</span>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>`;

    tasksListContainer.insertAdjacentHTML("beforeend", task);
  });

  // Update taskCount and display
  taskCount = tasks.length;
  console.log(taskCount);
  displayCount(taskCount);
  // taskCount = 0;
  // dispalyCount(taskCount)
  // newTaskInput.value = ""

  if (!(taskCount == 0)) {
    const clearButton = document.querySelector(".clear");
    clearButton.style.display = "block"; // Show the clear button
  }

// delete the task
deleteButtonListeners(); // Set up delete button event listeners when the page loads

// edit the Task
editButtonListeners();// Set up edit button event listeners when the page loads

// checkmark the Task
checkmarkListeners();// Set up edit button event listeners when the page loads
};

