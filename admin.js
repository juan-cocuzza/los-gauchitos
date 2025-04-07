const lista = document.getElementById("lista-productos");
const form = document.getElementById("form-agregar");

// Mostrar productos existentes
async function cargarProductos() {
const res = await fetch("http://localhost:3000/productos");
const productos = await res.json();

lista.innerHTML = "";

productos.forEach(producto => {
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Precio: ${producto.precio}</p>
    <p>Categoría: ${producto.categoria}</p>
    <img src="${producto.img}" width="100" />
    <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
    `;
    lista.appendChild(div);
});
}

// Agregar nuevo producto
form.addEventListener("submit", async e => {
e.preventDefault();

const formData = new FormData(form);
const nuevoProducto = {
    nombre: formData.get("nombre"),
    precio: formData.get("precio"),
    img: formData.get("img"),
    categoria: formData.get("categoria")
};

const res = await fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoProducto)
});

if (res.ok) {
    alert("Producto agregado");
    form.reset();
    cargarProductos();
} else {
    alert("Error al agregar producto");
}
});

// Eliminar producto
async function eliminarProducto(id) {
const res = await fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE"
});

if (res.ok) {
    alert("Producto eliminado");
    cargarProductos();
} else {
    alert("Error al eliminar producto");
}
}

// Cargar productos al abrir la página
cargarProductos();
