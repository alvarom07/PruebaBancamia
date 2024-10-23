// Registro de nuevo usuario
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtengo los valores del formulario
    const nombres = document.getElementById('firstName').value;  
    const apellidos = document.getElementById('lastName').value; 
    const tipoDocumento = document.getElementById('documentType').value;
    const numeroDocumento = document.getElementById('documentNumber').value; 
    const fechaNacimiento = document.getElementById('birthDate').value;  
    const ciudadNacimiento = document.getElementById('birthCity').value;  
    const telefono = document.getElementById('phone').value;  
    const nuevoUsuario = document.getElementById('newUsername').value;  
    const nuevaContrasena = document.getElementById('newPassword').value; 
    const confirmarContrasena = document.getElementById('confirmPassword').value; 

    // Valido campo de nombres y apellidos (solo letras)
    if (!/^[a-zA-Z\s]+$/.test(nombres)) {
        alert('Los nombres solo deben contener letras.');
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
        alert('Los apellidos solo deben contener letras.');
        return;
    }

    // Valido número de documento según el tipo
    if (tipoDocumento === 'C.C.') {
        if (!/^\d{8,}$/.test(numeroDocumento)) {
            alert('La cédula de ciudadanía debe tener al menos 8 caracteres numéricos.');
            return;
        }
    } else if (tipoDocumento === 'T.I.') {
        if (!/^[a-zA-Z0-9]{8,}$/.test(numeroDocumento)) {
            alert('La tarjeta de identidad debe tener al menos 8 caracteres.');
            return;
        }
    } else if (tipoDocumento === 'C.E.') {
        if (!/^[a-zA-Z0-9]+$/.test(numeroDocumento)) {
            alert('La cédula de extranjería debe contener caracteres alfanuméricos.');
            return;
        }
    } else {
        alert('Debe seleccionar un tipo de documento válido.');
        return;
    }

    // Valido la fecha de nacimiento (mínimo 10 años)
    const hoy = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
    }

    if (edad < 10) {
        alert('Debe tener al menos 10 años para registrarse.');
        return;
    }

    // Valido el número de teléfono (10 dígitos)
    if (!/^\d{10}$/.test(telefono)) {
        alert('El teléfono debe tener 10 dígitos.');
        return;
    }

    // Valido ciudad de nacimiento (solo letras)
    if (!/^[a-zA-Z\s]+$/.test(ciudadNacimiento)) {
        alert('La ciudad de nacimiento solo puede contener letras.');
        return;
    }

    // Valido contraseña (al menos 6 caracteres alfanuméricos)
    if (!/^[a-zA-Z0-9]{6,}$/.test(nuevaContrasena)) {
        alert('La contraseña debe tener al menos 6 caracteres alfanuméricos.');
        return;
    }

    // Valido confirmación de contraseña
    if (nuevaContrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Verifico si el usuario ya existe en localStorage
    if (localStorage.getItem(nuevoUsuario)) {
        alert('El nombre de usuario ya está registrado.');
        return;
    }

    // Se guarda la información del usuario en localStorage
    const usuario = {
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        fechaNacimiento,
        ciudadNacimiento,
        telefono,
        nuevoUsuario,
        nuevaContrasena
    };

    // Guardar el usuario en localStorage
    localStorage.setItem(nuevoUsuario, JSON.stringify(usuario));

    alert('Registro exitoso. Ya puedes iniciar sesión.');

    // Redirigir al formulario de inicio de sesión
    window.location.href = 'index.html';
});

// Inicio de sesión
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();  
    const password = document.getElementById('loginPassword').value;  

    // Verificar si el usuario existe en localStorage
    const usuarioGuardado = localStorage.getItem(username);

    // Si el usuario no está registrado
    if (!usuarioGuardado) {
        alert('El usuario no existe.'); // Mensaje si el usuario no fue registrado
        return;
    }

    // Si el usuario está registrado, verificar la contraseña
    const usuario = JSON.parse(usuarioGuardado);

    // Comparar la contraseña ingresada con la contraseña almacenada
    if (usuario.nuevaContrasena === password) {
        alert('Inicio de sesión exitoso.');
        // Redirigir a la página principal o a donde se necesite
        window.location.href = 'Bienvenido.html'; // Cambia a la página principal deseada
    } else {
        alert('Contraseña incorrecta.'); // Mensaje si la contraseña no coincide
    }
});
