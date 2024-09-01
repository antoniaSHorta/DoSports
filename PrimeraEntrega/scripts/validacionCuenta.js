document.addEventListener("DOMContentLoaded", () => {
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const rut = document.getElementById("rut");
    const correo = document.getElementById("correo");
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const contraseña = document.getElementById("contraseña");
    const check_contraseña = document.getElementById("contraseña-copy");
    const form = document.getElementById("form");

    const mensajes = {
        nombre: "Nombre incorrecto",
        apellido: "Apellido incorrecto",
        rut: "Rut incorrecto",
        correo: "Correo incorrecto",
        region: "Región incorrecta",
        comuna: "Comuna incorrecta",
        contraseña: "Contraseña muy corta",
        check_contraseña: "Contraseña no coincide"
    };

    const fields = [nombre, apellido, rut, correo, region, comuna, contraseña, check_contraseña];
    fields.forEach(field => {
        if (!field.dataset.originalPlaceholder) {
            field.dataset.originalPlaceholder = field.placeholder;
        }
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        let entrar = false;

        fields.forEach(field => {
            field.classList.remove("input-error");
            if (field.dataset.originalPlaceholder) {
                field.placeholder = field.dataset.originalPlaceholder;
            }
        });

        if (nombre.value.trim().length === 0) {
            nombre.placeholder = mensajes.nombre;
            nombre.classList.add("input-error");
            entrar = true;
        }
        if (apellido.value.trim().length === 0) {
            apellido.placeholder = mensajes.apellido;
            apellido.classList.add("input-error");
            entrar = true;
        }
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut.value.trim())) {
            rut.placeholder = mensajes.rut;
            rut.classList.add("input-error");
            rut.value = "";
            entrar = true;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
            correo.placeholder = mensajes.correo;
            correo.classList.add("input-error");
            entrar = true;
        }
        if (region.value.trim().length === 0) {
            region.placeholder = mensajes.region;
            region.classList.add("input-error");
            entrar = true;
        }
        if (comuna.value.trim().length === 0) {
            comuna.placeholder = mensajes.comuna;
            comuna.classList.add("input-error");
            entrar = true;
        }
        if (contraseña.value.trim().length < 8) {
            contraseña.value = "";
            contraseña.placeholder = mensajes.contraseña;
            contraseña.classList.add("input-error");
            entrar = true;
        }
        if (contraseña.value.trim() !== check_contraseña.value.trim()) {
            check_contraseña.value = "";
            check_contraseña.placeholder = mensajes.check_contraseña;
            check_contraseña.classList.add("input-error");
            entrar = true;
        }
        if (!document.getElementById("check").checked) {
            alert("Debe aceptar los términos y condiciones");
            entrar = true;
        }

        if (!entrar) {
            alert("Formulario enviado con éxito");
        }
    });
});
