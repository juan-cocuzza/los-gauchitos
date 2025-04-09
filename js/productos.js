// --------------------------------------------
// NAVBAR DINÁMICO SEGÚN USUARIO LOGUEADO
// --------------------------------------------

const navLinks = document.getElementById("nav-links");
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
const usuarioInfo = document.getElementById("usuario-info");

if (usuarioLogueado) {
  navLinks.innerHTML = `
    <li><a href="/index.html">Inicio</a></li>
    <li><a href="/paginas/productos.html">Productos</a></li>
    <li><a href="/paginas/contacto.html">Contacto</a></li>
    <li><span>👤 ${usuarioLogueado.nombre}</span></li>
    <li><a href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
    <li><a href="/paginas/carrito.html">🛒</a></li>
  `;
}

if (usuarioInfo) {
  if (usuarioLogueado) {
    usuarioInfo.innerHTML = `
      <span>👤 ${usuarioLogueado.email}</span>
      <button onclick="cerrarSesion()" style="margin-left: 10px;">Salir</button>
    `;
  } else {
    usuarioInfo.innerHTML = `<a href="login.html">Login</a>`;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  localStorage.removeItem("usuarioActivo");
  window.location.reload();
}

// --------------------------------------------
// AGREGAR PRODUCTOS AL CARRITO
// --------------------------------------------

const botonesAgregar = document.querySelectorAll(".producto button");

botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    const producto = boton.closest(".producto");
    const nombre = producto.querySelector("h4").innerText;
    const precio = producto.querySelector("p").innerText;
    const img = producto.querySelector("img").src;

    const item = { nombre, precio, img };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`Agregado al carrito: ${nombre}`);
  });
});
//----------------------------------------------------------
function agregarAlCarrito(nombre, precio, img) {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario) {
    alert("Debés iniciar sesión para agregar productos al carrito.");
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push({ nombre, precio, img });
  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto agregado al carrito");
}

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
