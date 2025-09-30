// Capturar elementos del DOM
const form = document.getElementById("task-form");
const textarea = document.getElementById("task-textarea");
const taskList = document.getElementById("task-list");

// Función para crear un li con botón y agregarlo al DOM
function addTask(taskText, completed = false) {
    const li = document.createElement("li");

    // Texto de la tarea
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    // Marcar como completada si corresponde
    if(completed) li.classList.add("completed");

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    // Agregar al DOM
    taskList.appendChild(li);

    // Click en el li para marcar completada
    span.addEventListener("click", function(){
        li.classList.toggle("completed");
        saveTasks();
    });

    // Click en el botón para eliminar
    deleteBtn.addEventListener("click", function(){
        li.remove();
        saveTasks();
    });
}

// Función para guardar todas las tareas en localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage al iniciar
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Evento submit del formulario
form.addEventListener("submit", function(e){
    e.preventDefault(); // Evita que la página se recargue
    const taskText = textarea.value.trim();
    if(taskText === "") return; // No permite tareas vacías
    addTask(taskText);
    saveTasks(); // Guardar en localStorage
    textarea.value = ""; // Limpiar textarea
});

// Cargar tareas al iniciar
loadTasks();
