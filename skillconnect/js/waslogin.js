const storedUser = JSON.parse(localStorage.getItem("user"));
const sesion0 = document.getElementById("sesion0");

if (!storedUser) {
    sesion0.href = "login.html";
    sesion0.textContent = "Iniciar Sesión";
    sesion0.classList.add("btn-primary");
} else {
    sesion0.href = "#";
    sesion0.textContent = "Cerrar Sesión";
    sesion0.classList.add("btn-secondary");
    sesion0.onclick = logout; // Assign the function directly
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

