const aprendices = [
{ id: 1, nombre: "Ana", ficha: 3223874, nota: 4.2 },
{ id: 2, nombre: "Luis", ficha: 3223874, nota: 3.5 },
{ id: 3, nombre: "María", ficha: 3223875, nota: 4.8 }
];

// 1. obtenerAprobados(aprendices)
// Retorna array con nota >= 3.0
const obtenerAprobados = (aprendices) => {
    return aprendices.filter(aprendiz => aprendiz.nota >= 3.0);
};

// 2. calcularPromedio(aprendices)
// Retorna promedio del grupo
const calcularPromedio = (aprendices) => {
    const suma = aprendices.reduce((acum, aprendiz) => acum + aprendiz.nota, 0);
    return suma / aprendices.length;
};

// 3. buscarPorNombre(aprendices, nombre)
// Retorna aprendiz que coincida
const buscarPorNombre = (aprendices, nombre) => {
    return aprendices.find(aprendiz => 
        aprendiz.nombre.toLowerCase() === nombre.toLowerCase()
    );
};

// 4. obtenerNombres(aprendices)
// Retorna array solo con nombres
const obtenerNombres = (aprendices) => {
    return aprendices.map(aprendiz => aprendiz.nombre);
};


// PRUEBAS
console.log("Aprobados:", obtenerAprobados(aprendices));
console.log("Promedio:", calcularPromedio(aprendices));
console.log("Buscar por nombre:", buscarPorNombre(aprendices, "Ana"));
console.log("Nombres:", obtenerNombres(aprendices));
