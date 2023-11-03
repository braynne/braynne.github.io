let users = [];

// Function to populate the DataTable
function populateDataTable() {
    // Destroy the existing DataTable (if any)
    if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
    }

    const table = $("#userTable").DataTable({
        data: users,
        columns: [
            { data: "username" },
            { data: "password" },
            { data: "role" },
            { data: "occupation" },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button class="btn btn-danger btn-sm delete-button">Eliminar</button>`;
                },
            },
        ],
    });

    // Handle delete button clicks
    $("#userTable tbody").on("click", "button.delete-button", function () {
        const row = table.row($(this).parents("tr"));
        const rowData = row.data();
        const index = users.indexOf(rowData);
        deleteUser(index);
    });
}

// Function to add a user
function addUser(username, password, role, occupation) {
    users.push({ username, password, role, occupation });
    saveUsersToLocalStorage();
    populateDataTable();
}

// Function to delete a user
function deleteUser(index) {
    // Ask for confirmation
    const confirmDelete = confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {
        users.splice(index, 1);
        saveUsersToLocalStorage();
        populateDataTable();
    }
}

// Function to save users to localStorage
function saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Load users from localStorage (if any)
const storedUsers = localStorage.getItem("users");
if (storedUsers) {
    users = JSON.parse(storedUsers);
}

// Call the initial population of DataTable
populateDataTable();


// Evento para agregar usuarios
const userForm = document.getElementById("user-form");
userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const occupation = document.getElementById("occupation").value;
    addUser(username, password, role, occupation);
    userForm.reset();
});