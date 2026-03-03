// Implementa estas funciones:
// 1. agregarContacto(nombre, tel,correo)
// Agrega al array con ID único
// 2. eliminarContacto(id)
// Remueve del array
// 3. buscarContacto(termino)
// Busca en nombre o correo
// 4. actualizarContacto(id, datos)
// Modifica contacto existente
// 5. exportarJSON(contactos)
// Convierte a JSON string

let contactos = [];

// Generador simple de ID único
const generarId = () => Date.now();


// 1. agregarContacto(nombre, tel, correo)
// Agrega al array con ID único
const agregarContacto = (nombre, tel, correo) => {
    const nuevoContacto = {
        id: generarId(),
        nombre,
        tel,
        correo
    };

    contactos.push(nuevoContacto);
    return nuevoContacto;
};


// 2. eliminarContacto(id)
// Remueve del array
const eliminarContacto = (id) => {
    contactos = contactos.filter(contacto => contacto.id !== id);
};


// 3. buscarContacto(termino)
// Busca en nombre o correo
const buscarContacto = (termino) => {
    termino = termino.toLowerCase();

    return contactos.filter(contacto =>
        contacto.nombre.toLowerCase().includes(termino) ||
        contacto.correo.toLowerCase().includes(termino)
    );
};


// 4. actualizarContacto(id, datos)
// Modifica contacto existente
const actualizarContacto = (id, datos) => {
    const contacto = contactos.find(c => c.id === id);

    if (contacto) {
        Object.assign(contacto, datos);
        return contacto;
    }

    return null;
};


// 5. exportarJSON(contactos)
// Convierte a JSON string
const exportarJSON = (contactos) => {
    return JSON.stringify(contactos, null, 2);
};



// ===== PRUEBAS =====
const c1 = agregarContacto("Ana", "3001234567", "ana@mail.com");
const c2 = agregarContacto("Luis", "3019876543", "luis@mail.com");

console.log("Contactos:", contactos);

console.log("Buscar 'ana':", buscarContacto("ana"));

actualizarContacto(c1.id, { tel: "999999999" });
console.log("Actualizado:", contactos);

eliminarContacto(c2.id);
console.log("Después de eliminar:", contactos);

console.log("JSON:", exportarJSON(contactos));
