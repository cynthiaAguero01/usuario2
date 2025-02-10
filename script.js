let usuarios = [];

async function obtenerUsuarios() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        const datos = await respuesta.json();
        usuarios = datos; 
        mostrarUsuarios();
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
}


function mostrarUsuarios() {
    const contenedor = document.getElementById("lista-usuarios");
    contenedor.innerHTML = ""; 

    if (usuarios.length === 0) {
        contenedor.innerHTML = `<p>No hay usuarios disponibles.</p>`;
        return;
    }

    usuarios.forEach(usuario => {
        agregarUsuarioATarjeta(usuario);
    });
}


function agregarUsuarioATarjeta(usuario) {
    const contenedor = document.getElementById("lista-usuarios");

    const usuarioElemento = document.createElement("div");
    usuarioElemento.classList.add("usuario");
    usuarioElemento.innerHTML = `
        <h3>${usuario.name}</h3>
        <p><i class="fas fa-user"></i> <strong>Username:</strong> ${usuario.username}</p>
        <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${usuario.email}</p>
        <p><i class="fas fa-map-marker-alt"></i> <strong>Ciudad:</strong> ${usuario.address?.city || "No especificado"}</p>
        <p><i class="fas fa-phone"></i> <strong>Teléfono:</strong> ${usuario.phone}</p>
        <p><i class="fas fa-building"></i> <strong>Empresa:</strong> ${usuario.company?.name || "No especificado"}</p>
    `;

    contenedor.appendChild(usuarioElemento);
}

document.getElementById("buscador").addEventListener("input", function () {
    const filtro = this.value.toLowerCase();
    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(filtro) ||
        usuario.username.toLowerCase().includes(filtro) ||
        usuario.email.toLowerCase().includes(filtro) ||
        usuario.address.city.toLowerCase().includes(filtro)
    );

    mostrarUsuariosFiltrados(usuariosFiltrados);
    mostrarMensajeError(usuariosFiltrados.length === 0);
});


function mostrarUsuariosFiltrados(usuariosFiltrados) {
    const contenedor = document.getElementById("lista-usuarios");
    contenedor.innerHTML = "";

    usuariosFiltrados.forEach(usuario => {
        agregarUsuarioATarjeta(usuario);
    });
}


function mostrarMensajeError(mostrar) {
    const mensaje = document.getElementById("mensaje-no-encontrado");
    if (mostrar) {
        mensaje.style.display = "block";
    } else {
        mensaje.style.display = "none";
    }
}


document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const empresa = document.getElementById("empresa").value.trim();

    if (nombre && username && email && ciudad && telefono && empresa) {
        const nuevoUsuario = {
            id: usuarios.length + 1, 
            name: nombre,
            username: username,
            email: email,
            address: { city: ciudad },
            phone: telefono,
            company: { name: empresa }
        };

        usuarios.push(nuevoUsuario); 
        agregarUsuarioATarjeta(nuevoUsuario);

        
        const mensajeBienvenida = document.createElement("div");
        mensajeBienvenida.classList.add("mensaje-bienvenida");
        mensajeBienvenida.textContent = "¡Usuario agregado exitosamente!";
        document.body.appendChild(mensajeBienvenida);

        setTimeout(() => {
            mensajeBienvenida.classList.add("desaparecer");
        }, 2000);

        setTimeout(() => {
            mensajeBienvenida.remove();
        }, 3000);
    }
});

obtenerUsuarios();
