const crearContacto = (nombre, telefono) => ({
id: Date.now(),
nombre: nombre,
telefono: telefono,
fechaCreacion: new Date().toLocaleDateString()
});

const contacto1 = crearContacto("Gustavo", "3001234567");
console.log(contacto1);
const { nombre: nombreContacto, telefono } = contacto1;
console.log(`Contacto: ${nombreContacto} - ${telefono}`);