// ejercicios.js
const nombre = "Carolina";
const ficha = 3223874;
const nota1 = 4.0;
const nota2 = 4.5;
const nota3 = 3.8;

const promedio = (nota1 + nota2 + nota3) / 3;
console.log(`Aprendiz: ${nombre}`);
console.log(`Ficha: ${ficha}`);
console.log(`Promedio: ${promedio.toFixed(2)}`);
const aprobado = promedio >= 3.0;
console.log(`Estado: ${aprobado ? 'APROBADO' : 'NOAPROBADO'}`);