const tabla = $("#lista-usuarios").DataTable({
    "paging": true, // Enable paging
    "info": true, // Show table information
    "searching": true, // Enable searching
    "ordering": true // Enable column sorting
});

function cargarUsuarios() {
    try {
        fetch("../json/usuarios.json")
            .then(respuesta => respuesta.json())
            .then(usuarios => {
                usuarios.forEach(usuario => {
                    tabla.row.add([
                        usuario.username,
                        usuario.fullname,
                        usuario.role,
                        usuario.occupation
                    ]).draw(false);
                });
            })
            .catch(error => {
                Message("Error", "JSON Fetch: No se ha podido cargar la tabla.");
            });
    } catch (error) {
        Message("Error", "Error al cargar usuarios.");
    }
}

cargarUsuarios();
