// Mostrar usuario logueado en la navbar
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const usuarioInfo = document.getElementById("usuario-info");

if (usuarioActivo) {
usuarioInfo.innerHTML = `
    <span>👤 ${usuarioActivo.email}</span>
    <button onclick="cerrarSesion()" style="margin-left: 10px;">Salir</button>
`;
} else {
usuarioInfo.innerHTML = `<a href="/paginas/login.html">Login</a>`;
}

function cerrarSesion() {
localStorage.removeItem("usuarioActivo");
localStorage.removeItem("usuarioLogueado");
window.location.reload();
}

// Agregar producto al carrito
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const botones = document.querySelectorAll(".btn-agregar");

    botones.forEach(boton => {
    boton.addEventListener("click", () => {
        if (!usuario) {
        alert("Debés iniciar sesión para agregar productos al carrito.");
        return;
        }

        const producto = boton.closest(".producto");
        const nombre = producto.querySelector("h3, h4").innerText;
        const precio = producto.querySelector("p").innerText;
        const img = producto.querySelector("img").src;

        const item = { nombre, precio, img };

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(item);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert(`Agregado al carrito: ${nombre}`);
    });
    });
});
