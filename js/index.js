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

let categories = [
  {
    title: "Personal",
    img: "boy.png",
  },
  {
    title: "Work",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
];

let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Shopping",
    completed: false,
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
  },
  {
    id: 3,
    task: "Prepare presentation for meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 4,
    task: "Prepare presentation for meeting",
    category: "Work",
    completed: false,
  },
];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

// Renderizar todas das tarefas
const totalTasksCategory = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );

  totalCategoryTasks.innerHTML = `${categoryTasks.length} Tarefa(s)`;
  totalTasks.innerHTML = tasks.length;
};

// Renderizar categorias
const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    // obter todas as tarefas da atual categoria
    const categoryTask = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );

    // criar a div para renderizar a categoria
    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      wrapper.classList.add("show-category");
      selectedCategory = category;
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `/images/${category.img}`;
      totalTasksCategory();
    });
    div.innerHTML = `<div class="left">
                <img src="images/${category.img}" alt="${category.title}" />
                <div class="content">
                  <h1>${category.title}</h1>
                  <p>${categoryTask.length} tarefa(s)</p>
                </div>
              </div>
              <div class="options">
                <div class="toggle-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </div>
              </div>`;

    categoriesContainer.appendChild(div);
  });
};

// Renderizar as tarefas

const renderTasks = () => {
  //-------------------------------
};

totalTasksCategory();
renderCategories();
