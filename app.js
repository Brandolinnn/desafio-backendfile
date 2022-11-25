const { error } = require("console");
const fs = require("fs")

class contenedor {
  constructor(nombre = "") {
    this.nombre = nombre;
  }
  async save({
    nombre: nombre,
    precio: precio,
    image: image

  }) {
    let productos = []
    let producto = {
      nombre: nombre,
      precio: precio,
      image: image,
      id: 1,

    };

    try {
      let content = JSON.stringify(producto, null, 2);

      await fs.promises.writeFile(this.nombre, content)

      console.log(`Contenido: ${content}`);

    } catch (error) {

    }

  }
}

const productos = new contenedor("productos.txt");


productos.save({
  nombre: "Remera",
  precio: "300",
  image: ""
}, 
{
  nombre: "Pantalon",
  precio: "600",
  image: ""
})


