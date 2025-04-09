document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("productos-admin");
    const form = document.getElementById("form-agregar");
    // 1. Mostrar productos existentes
    function cargarProductos() {
    fetch("http://localhost:3000/productos")
        .then(res => res.json())
        .then(data => {
        contenedor.innerHTML = "";
        data.forEach(prod => {
            const div = document.createElement("div");
            div.classList.add("producto-admin");
            div.innerHTML = `
            <img src="${prod.img}" width="100">
            <h4>${prod.nombre}</h4>
            <p>Precio: $${prod.precio}</p>
            <p>Categoría: ${prod.categoria}</p>
            <button onclick="eliminarProducto('${prod.id}')">Eliminar</button>
            `;
            contenedor.appendChild(div);
        });
        });
    }
    // 2. Agregar nuevo producto
    form.addEventListener("submit", e => {
    e.preventDefault();

    const nuevoProducto = {
        nombre: form.nombre.value,
        precio: form.precio.value,
        categoria: form.categoria.value,
        img: form.img.value
    };
    fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto)
    })
        .then(res => res.json())
        .then(() => {
    form.reset();
        cargarProductos();
        });
    });
    // 3. Eliminar producto
    window.eliminarProducto = function (id) {
    fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    })
        .then(() => {
        cargarProductos();
        });
    };

    cargarProductos();
});
