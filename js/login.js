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

const form = document.getElementById("form-login");

form.addEventListener("submit", function (e) {
e.preventDefault();
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const usuario = usuarios.find(u => u.email === email && u.password === password);

if (usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario)); // para el carrito
    alert("Inicio de sesión exitoso");
    window.location.href = "/index.html";
} else {
    alert("Correo o contraseña incorrectos");
}
});
