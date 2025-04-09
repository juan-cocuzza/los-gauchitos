// Obtener el usuario logueado
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

// Si no hay usuario logueado, redirigir
if (!usuario) {
alert("Debés iniciar sesión para acceder a esta página.");
window.location.href = "/paginas/login.html";
}

// Navbar dinámica
const navLinks = document.getElementById("nav-links");
if (usuario) {
navLinks.innerHTML = `
    <li><a href="/index.html">Inicio</a></li>
    <li><a href="/paginas/productos.html">Productos</a></li>
    <li><a href="/paginas/contacto.html">Contacto</a></li>
    <li><span>👤 ${usuario.nombre || usuario.email}</span></li>
    <li><a href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
    <li><a href="/paginas/carrito.html">🛒</a></li>
`;
}

// Mostrar nombre del usuario en la sección superior
const usuarioInfo = document.getElementById("usuario-info");
usuarioInfo.innerHTML = `
<span>👤 ${usuario.nombre || usuario.email}</span>
<button onclick="cerrarSesion()" style="margin-left: 10px;">Salir</button>
`;

// Función para cerrar sesión
function cerrarSesion() {
localStorage.removeItem("usuarioLogueado");
window.location.reload();
}

// Mostrar el carrito
const contenedor = document.getElementById("carrito");
const totalDiv = document.getElementById("total");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
contenedor.innerHTML = "";
let total = 0;

carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <img src="${item.img}" width="100" />
    <h4>${item.nombre}</h4>
    <p>${item.precio}</p>
    <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);

    total += parseFloat(item.precio.replace("$", ""));
});

totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
}

// Eliminar producto del carrito
function eliminarProducto(index) {
carrito.splice(index, 1);
localStorage.setItem("carrito", JSON.stringify(carrito));
mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
localStorage.removeItem("carrito");
carrito = [];
mostrarCarrito();
}

// Ir a pagar
function irAPagar() {
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (!usuario) {
    alert("Debés iniciar sesión para finalizar la compra.");
    return;
}

let historial = JSON.parse(localStorage.getItem("historialCompras")) || {};
if (!historial[usuario.email]) {
    historial[usuario.email] = [];
}

historial[usuario.email].push({
    productos: carrito,
    fecha: new Date().toLocaleString()
});

localStorage.setItem("historialCompras", JSON.stringify(historial));

fetch("http://localhost:3000/crear-preferencia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carrito })
})
    .then(res => res.json())
    .then(data => {
    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
    })
    .catch(err => {
    console.error("Error al crear preferencia:", err);
    alert("Hubo un problema al generar el pago.");
    });
}

// Mostrar carrito al cargar la página
mostrarCarrito();

// Exportar función si la necesitás usar desde el HTML
window.irAPagar = irAPagar;
window.vaciarCarrito = vaciarCarrito;
