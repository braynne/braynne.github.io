// Reset the unread message count to 0
localStorage.setItem("unreadMessagesCount", 0);

// Function to populate the DataTable
function populateMessageDataTable() {
    // Obtain the list of messages from Local Storage
    const mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

    // Destroy the existing DataTable (if any)
    if ($.fn.DataTable.isDataTable("#messageTable")) {
        $("#messageTable").DataTable().destroy();
    }

    const table = $("#messageTable").DataTable({
        data: mensajes,
        columns: [
            { data: "correo" },
            { data: "asunto" },
            { data: "mensaje" },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <form action="https://formsubmit.co/${data.correo}" method="POST">
                            <input type="text" class="form-control" placeholder="Respuesta" name="Respuesta a '${data.asunto}'">
                            <input type="submit" class="btn btn-primary btn-sm" value="Responder">
                        </form>
                    `;
                },
            },
        ],
    });
}

// Call the initial population of DataTable
populateMessageDataTable();
