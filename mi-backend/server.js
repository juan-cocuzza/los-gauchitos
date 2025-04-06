const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

// 🔁 Nuevo formato: Crear una instancia del cliente de Mercado Pago
const client = new mercadopago.MercadoPagoConfig({
  accessToken: "TU_ACCESS_TOKEN_AQUÍ" // ⚠️ Reemplazá esto con tu token real
});

app.post("/crear-preferencia", async (req, res) => {
  const carrito = req.body.carrito;

  const items = carrito.map(producto => ({
    title: producto.nombre,
    unit_price: parseFloat(producto.precio.replace("$", "")),
    quantity: 1,
    currency_id: "ARS"
  }));

  try {
    const respuesta = await client.preference.create({
      body: {
        items: items,
        back_urls: {
          success: "https://tuweb.com/exito.html",
          failure: "https://tuweb.com/error.html",
          pending: "https://tuweb.com/pendiente.html"
        },
        auto_return: "approved"
      }
    });

    res.json({ id: respuesta.id });
  } catch (error) {
    console.error("❌ Error al crear preferencia:", error);
    res.status(500).send("Error al crear preferencia");
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
