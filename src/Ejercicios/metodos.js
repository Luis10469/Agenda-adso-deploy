// Ejercicio: Métodos de Array
const productos = [
  { nombre: "Laptop", precio: 1200000, stock: 5 },
  { nombre: "Mouse", precio: 35000, stock: 0 },
  { nombre: "Teclado", precio: 85000, stock: 12 }
];

// 1. Obtener productos disponibles (stock > 0)
function obtenerDisponibles(productos) {
  // filtramos los productos que tengan stock
  return productos.filter(producto => producto.stock > 0);
}

// 2. Calcular valor total del inventario
function calcularInventario(productos) {
  // sumamos precio * stock de cada producto
  return productos.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
}

// 3. Aplicar descuento a todos los productos
function aplicarDescuento(productos, porcentaje) {
  // creamos un nuevo array con los precios reducidos
  return productos.map(producto => {
    return {
      ...producto,
      precio: producto.precio * (1 - porcentaje / 100)
    };
  });
}

// 4. Ordenar productos por precio (menor a mayor)
function ordenarPorPrecio(productos) {
  // usamos slice() para no modificar el array original
  return productos.slice().sort((a, b) => a.precio - b.precio);
}

// Ejemplos de uso
console.log("Disponibles:", obtenerDisponibles(productos));
console.log("Valor inventario:", calcularInventario(productos));
console.log("Con 10% descuento:", aplicarDescuento(productos, 10));
console.log("Ordenados por precio:", ordenarPorPrecio(productos));
