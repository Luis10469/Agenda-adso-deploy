// Ejercicio: Gestión de Aprendices
const aprendices = [
  { id: 1, nombre: "Ana", ficha: 3223874, nota: 4.2 },
  { id: 2, nombre: "Luis", ficha: 3223874, nota: 3.5 },
  { id: 3, nombre: "María", ficha: 3223875, nota: 4.8 }
];

// 1. Obtener aprendices aprobados (nota >= 3.0)
function obtenerAprobados(aprendices) {
  return aprendices.filter(aprendiz => aprendiz.nota >= 3.0);
}

// 2. Calcular promedio del grupo
function calcularPromedio(aprendices) {
  if (aprendices.length === 0) return 0;
  const sumaNotas = aprendices.reduce((acum, aprendiz) => acum + aprendiz.nota, 0);
  return sumaNotas / aprendices.length;
}

// 3. Buscar aprendiz por nombre
function buscarPorNombre(aprendices, nombre) {
  return aprendices.find(aprendiz => aprendiz.nombre.toLowerCase() === nombre.toLowerCase()) || null;
}

// 4. Obtener array solo con nombres
function obtenerNombres(aprendices) {
  return aprendices.map(aprendiz => aprendiz.nombre);
}

// Ejemplos de uso
console.log("Aprobados:", obtenerAprobados(aprendices));
console.log("Promedio del grupo:", calcularPromedio(aprendices));
console.log("Buscar 'Luis':", buscarPorNombre(aprendices, "Luis"));
console.log("Nombres:", obtenerNombres(aprendices));
