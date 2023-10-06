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
    title: "Usuário",
    img: "boy.png",
  },
  {
    title: "Trabalho",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
  {
    title: "Educação",
    img: "education.png",
  },
  {
    title: "Saúde",
    img: "healthcare.png",
  },
  {
    title: "Finanças",
    img: "saving.png",
  },
  {
    title: "Treino",
    img: "dumbbell.png",
  },
  {
    title: "Lazer",
    img: "sun.png",
  },
];

let tasks = [];

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

      // renderizar tarefa quando a categoria mudar
      renderTasks();
    });
    div.innerHTML = `<div class="left">
                <img src="images/${category.img}" alt="${category.title}" />
                <div class="content">
                  <h1>${category.title}</h1>
                  <p>${categoryTask.length} tarefa(s)</p>
                </div>
              </div>
              `;

    categoriesContainer.appendChild(div);
  });
};

// Renderizar as tarefas

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
  tasksContainer.innerHTML = "";

  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );

  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-task">Nenhuma tarefa(s) nesta categoria!</p>`;
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;

      checkbox.addEventListener("change", () => {
        const id = tasks.findIndex((t) => t.id === task.id);

        // Muda o valor do "id" para falso ou vice-versa
        tasks[id].completed = !tasks[id].completed;

        // Salvar no localStorage
        saveLocalStorage();
      });

      div.innerHTML = `<div class="delete">
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
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>`;

      label.innerHTML = `
    <span class="checkmark"
                  ><svg
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <p>${task.task}</p>
    `;

      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      // Deletar tarefa
      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const id = tasks.findIndex((t) => t.id === task.id);

        tasks.splice(id, 1);
        saveLocalStorage();
        renderTasks();
        renderCategories();
        totalTasksCategory();
      });
    });
    renderCategories();
    totalTasksCategory();
  }
};

// Salvar e pegar tasks do localStorage
const saveLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getLocalStorage = () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));

  if (localTasks) {
    tasks = localTasks;
  }
};

const categorySelected = document.querySelector("#category-select");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const taskInput = document.querySelector("#task-input");

addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const category = categorySelected.value;

  if (task === "") {
    alert("Por favor, preencha o campo de tarefa!");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };

    tasks.push(newTask);
    taskInput.value = "";
    saveLocalStorage();
    toggleAddTaskForm();
    renderTasks();
    renderCategories();
  }
});

cancelBtn.addEventListener("click", toggleAddTaskForm);

// Renderizar todas as categorias selecionadas
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelected.appendChild(option);
});

// Adicionar uma nova tarefa

getLocalStorage();
renderCategories();
totalTasksCategory();
renderTasks();
