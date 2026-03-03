const productos = [
{ nombre: "Laptop", precio: 1200000, stock: 5 },
{ nombre: "Mouse", precio: 35000, stock: 0 },
{ nombre: "Teclado", precio: 85000, stock: 12 }
];

// 1. obtenerDisponibles(productos)
// Productos con stock > 0
const obtenerDisponibles = (productos) => {
    return productos.filter(producto => producto.stock > 0);
};

// 2. calcularInventario(productos)
// Valor total del inventario
const calcularInventario = (productos) => {
    return productos.reduce((total, producto) => {
        return total + (producto.precio * producto.stock);
    }, 0);
};

// 3. aplicarDescuento(productos, porcentaje)
// Reduce precios X%
const aplicarDescuento = (productos, porcentaje) => {
    return productos.map(producto => ({
        ...producto,
        precio: producto.precio - (producto.precio * porcentaje / 100)
    }));
};

// 4. ordenarPorPrecio(productos)
// Array ordenado menor a mayor
const ordenarPorPrecio = (productos) => {
    return [...productos].sort((a, b) => a.precio - b.precio);
};


// PRUEBAS
console.log("Disponibles:", obtenerDisponibles(productos));
console.log("Valor inventario:", calcularInventario(productos));
console.log("Con descuento 10%:", aplicarDescuento(productos, 10));
console.log("Ordenados por precio:", ordenarPorPrecio(productos));
