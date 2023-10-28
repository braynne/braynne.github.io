function mostrarMensajes() {
    // Obtiene la lista de mensajes del Local Storage
    let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

    // Accede al elemento <ul> con el id "lista-mensajes" donde deseas mostrar los mensajes
    const listaMensajes = document.getElementById("lista-mensajes");

    // Limpia cualquier contenido previo de la lista
    listaMensajes.innerHTML = "";

    // Itera sobre la lista de mensajes y crea elementos <li> para mostrarlos
    mensajes.forEach((mensajeObj, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>De:</strong> ${mensajeObj.correo}<br>
            <strong>Asunto:</strong> ${mensajeObj.asunto}<br>
            <strong>Mensaje:</strong> ${mensajeObj.mensaje}<br>
            <form id="form-respuesta-${index}" action="https://formsubmit.co/${mensajeObj.correo}" method="POST">
                <input type="text" class="form-control" placeholder="Respuesta" name="Respuesta a '${mensajeObj.asunto}'"></input>
                <input type="submit" class="btn btn-primary btn-sm" value="Responder"></input>
            </form>
        `;

        listaMensajes.appendChild(listItem);
    });
}

// Llama a esta función para mostrar los mensajes en la lista en la carga inicial de la página
mostrarMensajes();

function enviarRespuesta(index) {
    // Obtiene el contenido de la respuesta
    const respuesta = document.querySelector(`#form-respuesta-${index} input[type="text"]`).value;

    // Obtiene el mensaje original al que se está respondiendo
    const mensajeOriginal = JSON.parse(localStorage.getItem("mensajes"))[index];

    // Envía la respuesta al correo del remitente del mensaje original
    const correoDestino = mensajeOriginal.correo;
    // Aquí debes implementar el código para enviar el mensaje por correo electrónico,
    // lo cual dependerá de tu servidor de correo o servicio de correo electrónico que utilices.

    // Luego, puedes borrar el contenido del campo de respuesta si es necesario
    document.querySelector(`#form-respuesta-${index} input[type="text"]`).value = "";
}
