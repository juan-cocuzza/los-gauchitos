const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarioInfo = document.getElementById("usuario-info");

if (usuarioActivo) {
usuarioInfo.innerHTML = `
    <span>👤 ${usuarioActivo.email}</span>
    <button onclick="cerrarSesion()" style="margin-left: 10px;">Salir</button>
`;
} else {
usuarioInfo.innerHTML = `<a href="login.html">Login</a>`;
}

function cerrarSesion() {
localStorage.removeItem("usuarioActivo");
window.location.reload();
}

const form = document.getElementById("form-registro");

form.addEventListener("submit", (e) => {
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const yaExiste = usuarios.find(u => u.email === email);

if (yaExiste) {
    alert("Este correo ya está registrado");
    return;
}

usuarios.push({ email, password });
localStorage.setItem("usuarios", JSON.stringify(usuarios));
alert("Registro exitoso. Ahora podés iniciar sesión.");
window.location.href = "login.html";
});
