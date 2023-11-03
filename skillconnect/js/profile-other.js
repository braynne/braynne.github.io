let username1 = "Externo"; // Declare the variable in the broader scope

document.addEventListener("DOMContentLoaded", function () {
    // Get the username from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    // Fetch user data from usuarios.json based on the username
    fetch("../json/usuarios.json")
            .then((response) => response.json())
            .then((usuarios) => {
                const user = usuarios.find((user) => user.username === username);

                if (user) {
                    // Display the user information on the profile page
                    const namedata = document.getElementById("user-username");
                    const fullnamedata = document.getElementById("user-fullname");
                    const roledata = document.getElementById("user-role");
                    const occdata = document.getElementById("user-occupation");
                    const userImage = document.getElementById("user-image");

                    username1 = user.username; // Assign the value to the variable

                    updateListGroupLinks(userRole);

                    namedata.textContent = "Nombre de usuario: " + user.username;
                    fullnamedata.textContent = user.fullname;
                    occdata.textContent = "Ocupación: " + user.occupation;
                    roledata.textContent = "Rol: " + user.role;
                    userImage.src = `../img/${user.username}.avif`;
                    // Update other profile details as needed
                } else {
                    // Handle the case where the user is not found
                    console.error("User not found.");
                }
            })
            .catch((error) => {
                console.error("Error loading usuarios.json:", error);
            });
});

// Get the user data from localStorage
const userRole = storedUser ? storedUser.role : "";

// Continue with the rest of your code...


function updateListGroupLinks(role) {
    const listGroup = document.querySelector(".list-group");
    listGroup.innerHTML = ""; // Clear the existing links

    // Add role-specific links based on the user's role
    listGroup.appendChild(createRoleLink("Inicio", "home.html", false, false));
    listGroup.appendChild(createRoleLink(`Perfil (${username1})`, "profile.html", true, false));
    listGroup.appendChild(createRoleLink("Ajustes", "#", false, false));

    if (role === "admin") {
        listGroup.appendChild(createRoleLink("Mensajes", "admin-messages.html", false, false));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", false, false));
    } else if (role === "user") {
        listGroup.appendChild(createRoleLink("Mensajes", "admin-messages.html", false, true));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", false, true));
    } else if (role === "worker") {
        listGroup.appendChild(createRoleLink("Mensajes", "admin-messages.html", false, true));
        listGroup.appendChild(createRoleLink("Vista de Administrador", "adminview.html", false, true));
    }
}

function createRoleLink(text, href, isActive = false, isDisabled = false) {
    const link = document.createElement("a");
    link.classList.add("list-group-item", "list-group-item-action");
    link.href = href;
    link.textContent = text;

    if (isActive) {
        link.classList.add("active");
    }

    if (isDisabled) {
        link.classList.add("disabled");
    }

    return link;
}

// Call the function to update list group links
