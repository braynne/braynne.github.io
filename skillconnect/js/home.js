
const userRole = storedUser ? storedUser.role : "";

// Continue with the rest of your code...
const PageName = window.location.href.split('/').pop();

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
        listGroup.appendChild(createRoleLink("Mensajes", "admin-messages.html", true));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", true));
    } else if (role === "worker") {
        listGroup.appendChild(createRoleLink("Mensajes", "admin-messages.html", true));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", true));
    }
}

function createRoleLink(text, href, isDisabled = false) {
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

    if (href === "admin-messages.html") {
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
