// Archivo: src/api.js
// Capa de acceso a datos de Agenda ADSO
// Aquí viven todas las funciones que hablan con la API

// Importamos la URL base desde config.js
import { API_BASE_URL } from "../config/config";


// ============================
// GET - LISTAR CONTACTOS
// ============================
export async function listarContactos() {

  // fetch hace una petición HTTP GET a la API
  const res = await fetch(API_BASE_URL);

  // Si el servidor responde con error, lanzamos excepción
  if (!res.ok) {
    throw new Error("Error al listar contactos");
  }

  // Convertimos la respuesta a JSON
  return res.json();
}



// ============================
// POST - CREAR CONTACTO
// ============================
export async function crearContacto(data) {

  const res = await fetch(API_BASE_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear el contacto");
  }

  return res.json();
}



// ============================
// DELETE - ELIMINAR CONTACTO
// ============================
export async function eliminarContactoPorId(id) {

  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el contacto");
  }

  return true;
}

// Función PUT: actualizar contacto por id
export async function actualizarContacto(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar el contacto");

  return res.json();
}