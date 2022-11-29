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

    if(productos.length > 0 && productos.some((i) => i.nombre === producto.nombre)){
      return null;
  }

    let nuevoId;

    if(productos.length == 0){
      nuevoId = 1
  } else {
      nuevoId = productos[productos.length-1].id + 1
  }

  const nuevoObjConId = {...productos, id:nuevoId}

        // insertar objeto al listado
        productos.push(nuevoObjConId)
   

    try {
      let content = JSON.stringify(producto, null, 2);

      await fs.promises.writeFile(this.nombre, content)

      console.log(`Contenido: ${content}`);

    } catch (error) {

    }

  } 

  async getById(id){
    try {
        const listado = await this.getAll()
        return listado.find(item => item.id === id)
    } catch (error) {
        throw new Error(`No se encontro el id: $(error)`)
    }
}

async deleteById(id){
    const productos = await this.getAll()
    const nuevoProductos = productos.filter( item=> item.id != id )
    try {
        await fs.promises.writeFile(this.nombre, JSON.stringify(nuevoProductos, null, 2))
    } catch (error) {
        throw new Error(`No se pudo borrar el id: $(error)`)
    }

}

async getAll(){
  try {
      const data = await fs.promises.readFile(this.nombre, 'utf8')
      return JSON.parse(data)
  } catch (error) {
      return []
  }
}
  

  async deleteAll(){
    try {
        await fs.promises.writeFile(this.nombre, JSON.stringify([], null, 2))
    } catch (error) {
        throw new Error(`No se pudo borrar todo`)
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


