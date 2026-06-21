
const taskForm = document.querySelector(".task-form"); // task form
const taskTitle = document.querySelector("#task-title"); // input task (task title)
const taskCategory = document.querySelector("#form-categories"); // selected category

const tasksContainer = document.querySelector(".tasks-container"); // all tasks will show here

const totalTasksCount = document.querySelector("#total-tasks-count"); // total tasks count
const completedTasksCount = document.querySelector("#completed-tasks-count"); // completed tasks count
const pendingTasksCount = document.querySelector("#pending-tasks-count"); // pending tasks count
const searchInput = document.querySelector("#search-input"); // search input field

const categoryFilter = document.querySelector("#categories"); // category filter select field

const clearTasksBtn = document.querySelector(".clear-tasks"); // clear all tasks button

const themeToggleBtn = document.querySelector(".theme-toggle-icon"); // theme toggle button


// global tasks array - mini database for CRUD 
let tasks = [];
// to keep track of task being edited
let editingTaskId = null;
// form submit event listener
function handleTaskSubmit() {
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let taskName = taskTitle.value.trim();
        if (!taskName) return;
        // console.log(taskName);
        let selectedCategory = taskCategory.value;
        // console.log(selectedCategory);
        const taskObj = {
            id: Date.now(),
            title: taskName,
            category: selectedCategory,
            status: "pending",
        }
        // check if we are in edit mode
        if (editingTaskId !== null) {
            const taskToUpdate = tasks.find(
                task => task.id === editingTaskId
            );
            taskToUpdate.title = taskName;
            taskToUpdate.category = selectedCategory;
        } else {
            tasks.push(taskObj);
            // console.log(taskObj);
        }
        editingTaskId = null;
        // console.log(tasks);
        saveTasks(); // save tasks to local storage
        taskForm.reset();
        renderTasks(); // this will render each task into UI
    })
}

handleTaskSubmit();
loadTasks(); // load tasks from local storage
renderTasks(); // render tasks to the DOM

// render tasks from tasks array to the DOM
function renderTasks( filteredTasks = tasks ) {
    // console.log(tasks); 
    // container empty
    tasksContainer.innerHTML = "";
    // converting each task into ui
    filteredTasks.forEach((task) => {
        tasksContainer.innerHTML += `   
        <div class="task" data-id="${task.id}">
                    <div class="task-info">
                        <div class="left-part"><i class="${task.status === "completed"
                ? "ri-circle-fill black-circle"
                : "ri-circle-line"}"></i></div>
                        <div class="right-part">
                            <div class="task-category-state">
                                <h4 class="task-category">${task.category}</h4>
                                <h4 class="task-state">${task.status}</h4>
                            </div>
                            <h2 class="task-name ${task.status === "completed" ? "completed-task" : ""}"> ${task.title}</h2>
                        </div>

                    </div>
                    <div class="manage-task-icons">
                        <span><i title="Edit Task" class="ri-edit-line edit-btn"></i></span>
                        <span><i title="Mark as Complete" class="ri-checkbox-circle-line complete-btn ${task.status === "completed" ? "completed-task" : ""}"></i></span>
                        <span><i title="Delete Task" class="ri-delete-bin-line delete-btn"></i></span>
                    </div>
                </div>`
    })
    updateStats(); // update task statistics
}
// update task statistics
function updateStats() {
    totalTasksCount.textContent = tasks.length;
    completedTasksCount.textContent = tasks.filter(task => task.status === "completed").length;
    pendingTasksCount.textContent = tasks.filter(task => task.status === "pending").length;
}

// save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load tasks from local storage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function handleTaskActions() {
    tasksContainer.addEventListener("click", (event) => {
        // delete task functionality
        if (event.target.classList.contains("delete-btn")) {
            const taskCard = event.target.closest(".task");
            // console.log(taskCard);
            const taskId = Number(taskCard.dataset.id);
            // console.log(taskId);
            tasks = tasks.filter(task => task.id !== taskId);
            // console.log(tasks);
            saveTasks();
            renderTasks();
        }
        // mark as complete functionality
        if (event.target.classList.contains("complete-btn")) {
            const taskCard = event.target.closest(".task");
            const taskId = Number(taskCard.dataset.id);
            const taskToUpdate = tasks.find(
                task => task.id === taskId
            );
            taskToUpdate.status = taskToUpdate.status === "pending"
                ? "completed"
                : "pending";
            saveTasks();
            renderTasks();
        }
        // edit and update task functionality
        if (event.target.classList.contains("edit-btn")) {
            const taskCard = event.target.closest(".task");
            const taskId = Number(taskCard.dataset.id);
            // console.log(taskId);
            const taskToEdit = tasks.find(
                task => task.id === taskId
            );
            // console.log(taskToEdit);
            taskTitle.value = taskToEdit.title; // set task title in input field
            taskCategory.value = taskToEdit.category; // set task category in select field

            editingTaskId = taskId;
        }
    });
}
handleTaskActions();

// function to handle search functionality
function handleSearch() {
    searchInput.addEventListener("input", (event) => {
        // console.log(event.target.value);
        const searchValue = event.target.value.toLowerCase();
        // console.log(searchValue);
        const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchValue));
        // console.log(filteredTasks);

        renderTasks(filteredTasks);
    });
}

handleSearch();



// function to handle category filter functionality
function handleCategoryFilter() {
    categoryFilter.addEventListener("change", (event) => {
        const selectedCategory = event.target.value;
        // show all tasks
        if (selectedCategory === "All") {
            renderTasks();
            return;
        }
        // filter tasks by category
        const filteredTasks = tasks.filter(
            task => task.category === selectedCategory
        );
        renderTasks(filteredTasks);
    });
}

handleCategoryFilter();

// function to handle clear all tasks functionality
function handleClearAllTasks() {
    clearTasksBtn.addEventListener("click", () => {
        tasks = [];
        saveTasks();
        renderTasks();
    });
}
handleClearAllTasks();

// function to handle theme toggle functionality
function handleThemeToggle() {
    themeToggleBtn.addEventListener("click", () => {

        // toggle dark theme class
        document.body.classList.toggle("dark-theme");

        // change icon
        const themeIcon = themeToggleBtn.querySelector("i");

        if (document.body.classList.contains("dark-theme")) {
            themeIcon.classList.remove("ri-sun-line");
            themeIcon.classList.add("ri-moon-line");
        } else {
            themeIcon.classList.remove("ri-moon-line");
            themeIcon.classList.add("ri-sun-line");
        }

    });
}

handleThemeToggle();