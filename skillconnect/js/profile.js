const PageName = window.location.href.split('/').pop();

document.addEventListener("DOMContentLoaded", function () {
    // Get the user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
        // Display the user information
        const userImage = document.getElementById("user-image");
        userImage.src = `../img/${userData.username}.avif`;

        const username = document.getElementById("user-username");
        username.textContent = `Nombre de usuario: ${userData.username}`;

        const fullname = document.getElementById("user-fullname");
        fullname.textContent = `${userData.fullname}`;

        const role = document.getElementById("user-role");
        role.textContent = `Rol: ${userData.role}`;

        const occupation = document.getElementById("user-occupation");
        occupation.textContent = `Ocupación: ${userData.occupation}`;
    } else {
        // Handle the case when user data is not found in localStorage
        console.error("User data not found in localStorage.");
    }
});

// Get the user data from localStorage
const userRole = storedUser ? storedUser.role : "";

// Continue with the rest of your code...


function updateListGroupLinks(role) {
    const listGroup = document.querySelector(".list-group");
    listGroup.innerHTML = ""; // Clear the existing links

    // Add role-specific links based on the user's role
    listGroup.appendChild(createRoleLink("Inicio", "home.html", false));
    listGroup.appendChild(createRoleLink("Perfil", "profile.html", false));
    listGroup.appendChild(createRoleLink("Ajustes", "#", false));
    
    if (role === "admin") {
        listGroup.appendChild(createRoleLink("Mensajes ", "admin-messages.html", false));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", false));
    } else if (role === "user") {
        listGroup.appendChild(createRoleLink("Mensajes", "admin-messages.html", false, true));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", true));
    } else if (role === "worker") {
        listGroup.appendChild(createRoleLink("Mensajes", "admin-messages.html", true));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", true));
    }
}

function createRoleLink(text, href, isDisabled) {
    const link = document.createElement("a");
    link.classList.add("list-group-item", "list-group-item-action");
    link.href = href;
    link.textContent = text;
    
    if (PageName.includes(href)) {
        link.classList.add("active");
    }
    
    if (isDisabled) {
        link.classList.add("disabled");
    }
    
    if (href === "admin-messages.html" && userRole === "admin") {
        const span = document.createElement("span");
        span.id = "unread-messages-badge";
        span.className = "badge bg-danger";
        span.textContent = "0";
        link.appendChild(span);
    }
    
    return link;
}

// Call the function to update list group links
updateListGroupLinks(userRole);
