const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};

const toggleAddTaskForm = () => {
  addTaskForm.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

//Eventos
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);

// Adicionar tarefas e categorias

let categories = [];

let tasks = [];

// --------------------------------------------------------------
