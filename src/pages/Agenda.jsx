import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto
} from "../api/api.js";

import { APP_INFO } from "../config/config.js";

import FormularioContacto from "../components/FormularioContacto";
import ContactoCard from "../components/ContactoCard";

export default function Agenda({ onLogout }) {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    logout()
    navigate("/login")
  }

  /* ===============================
     ESTADOS
  =============================== */

  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [contactoEditando, setContactoEditando] = useState(null);
  const [contactoAEliminar, setContactoAEliminar] = useState(null);

  const [vista, setVista] = useState("crear");

  const [busqueda, setBusqueda] = useState(() => {
    return localStorage.getItem("busquedaAgenda") || "";
  });

  const [ordenAsc, setOrdenAsc] = useState(true);

  const formularioRef = useRef(null);


  /* ===============================
     CONTROL DE VISTAS
  =============================== */

  const estaEnVistaCrear = vista === "crear";
  const estaEnVistaContactos = vista === "contactos";

  const irAVerContactos = () => {
    setVista("contactos");
    setContactoEditando(null);
  };

  const irACrearContacto = () => {
    setVista("crear");
    setContactoEditando(null);
    setBusqueda("");
  };


  /* ===============================
     CARGAR CONTACTOS
  =============================== */

  useEffect(() => {

    async function cargarContactos() {

      try {

        const data = await listarContactos();
        setContactos(data);

      } catch (error) {

        console.error(error);
        setError("No se pudo cargar la lista de contactos");

      } finally {

        setCargando(false);

      }

    }

    cargarContactos();

  }, []);


  /* ===============================
     GUARDAR BUSQUEDA
  =============================== */

  useEffect(() => {
    localStorage.setItem("busquedaAgenda", busqueda);
  }, [busqueda]);


  /* ===============================
     SCROLL AL EDITAR
  =============================== */

  useEffect(() => {

    if (contactoEditando && formularioRef.current) {

      formularioRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }, [contactoEditando]);


  /* ===============================
     CRUD
  =============================== */

  const agregarContacto = async (nuevo) => {

  try {

    const creado = await crearContacto(nuevo);

    setContactos((prev) => [...prev, creado]);

    toast.success("Contacto agregado correctamente ✅");

    setVista("contactos");

  } catch (error) {

    console.error(error);
    setError("No se pudo agregar el contacto");

    toast.error("Error al agregar contacto ❌");

  }

 };


 const editarContacto = async (id, datosActualizados) => {

  try {

    const actualizado = await actualizarContacto(id, datosActualizados);

    setContactos((prev) =>
      prev.map((c) => (c.id === id ? actualizado : c))
    );

    toast.success("Contacto actualizado ✏️");

    setContactoEditando(null);
    setVista("contactos");

  } catch (error) {

    console.error(error);
    setError("No se pudo actualizar el contacto");

    toast.error("Error al actualizar contacto ❌");

  }

 };


  const eliminarContacto = async (id) => {

  try {

    await eliminarContactoPorId(id);

    setContactos((prev) =>
      prev.filter((c) => c.id !== id)
    );

    toast.success("Contacto eliminado 🗑️");

  } catch (error) {

    console.error(error);
    setError("No se pudo eliminar el contacto");

    toast.error("Error al eliminar contacto ❌");

  }

 };


  /* ===============================
     ELIMINAR
  =============================== */

  const confirmarEliminar = (contacto) => {
    setContactoAEliminar(contacto);
  };

  const eliminarConfirmado = async () => {

    if (!contactoAEliminar) return;

    try {

      await eliminarContacto(contactoAEliminar.id);
      setContactoAEliminar(null);

    } catch (error) {

      console.error(error);

    }

  };


  /* ===============================
     FILTRAR CONTACTOS
  =============================== */

const contactosFiltrados = contactos.filter((c) => {

  const termino = busqueda.toLowerCase();

  return (
    (c.nombre || "").toLowerCase().includes(termino) ||
    (c.correo || "").toLowerCase().includes(termino) ||
    (c.telefono || "").toLowerCase().includes(termino) ||
    (c.etiqueta || "").toLowerCase().includes(termino)
  );

});


  /* ===============================
     ORDENAR CONTACTOS
  =============================== */

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {

    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;

    return 0;

  });


  /* ===============================
     UI
  =============================== */

  return (
    
    

    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <header className="max-w-6xl mx-auto px-6 pt-8">

        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
        </p>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          {APP_INFO.titulo}
        </h1>

        <p className="text-gray-500 mt-1">
          {APP_INFO.subtitulo}
        </p>

        <div className="mt-4">

          <button
            onClick={estaEnVistaCrear ? irAVerContactos : irACrearContacto}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            {estaEnVistaCrear
              ? "Ver contactos"
              : "Volver a crear contacto"}
          </button>

          <button
            onClick={cerrarSesion}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
          Cerrar sesión
          </button>

        </div>

      </header>


      {/* DASHBOARD */}

      <section className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">


        {/* CONTENIDO PRINCIPAL */}

        <div className="md:col-span-2 space-y-6">

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {cargando && (
            <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
              Cargando contactos desde la API...
            </div>
          )}


          {/* FORMULARIO */}

          {estaEnVistaCrear && (

            <div ref={formularioRef}>

              <FormularioContacto
                onAgregar={agregarContacto}
                onActualizar={editarContacto}
                contactoEditando={contactoEditando}
                cancelarEdicion={() => setContactoEditando(null)}
              />

            </div>

          )}


          {/* LISTA */}

          {estaEnVistaContactos && (

            <>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-4">

                <input
                  type="text"
                  placeholder="Buscar por nombre, correo o etiqueta..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full md:flex-1 rounded-xl border-gray-400 text-sm"
                />

                <button
                  onClick={() => setOrdenAsc((prev) => !prev)}
                  className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200"
                >
                  {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
                </button>

              </div>


              <div className="space-y-4">

                <AnimatePresence>

                  {contactosOrdenados.map((c) => (

                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >

                      <ContactoCard
                        {...c}
                        busqueda={busqueda}
                        onEliminar={() => confirmarEliminar(c)}

                        onEditar={() => {
                          setContactoEditando(c);
                          setVista("crear");
                        }}

                      />

                    </motion.div>

                  ))}

                </AnimatePresence>

              </div>

            </>

          )}

        </div>


        {/* PANEL LATERAL */}

        <aside className="space-y-6">

          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold mb-2">
              Agenda ADSO Dashboard
            </h2>

            <p className="text-sm opacity-90">
              CRUD desarrollado con React + JSON Server
            </p>

            <div className="mt-6">

              <p className="text-3xl font-black">
                {contactos.length}
              </p>

              <p className="text-xs opacity-70">
                registrados en la agenda
              </p>

            </div>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <h3 className="font-bold text-gray-800 mb-3">
              Tips de código limpio
            </h3>

            <ul className="text-sm text-gray-600 space-y-2">

              <li>✔ Usa nombres claros</li>
              <li>✔ Evita duplicar lógica</li>
              <li>✔ Un componente = una responsabilidad</li>
              <li>✔ Mantén archivos pequeños</li>

            </ul>

          </div>

        </aside>

      </section>


      {/* MODAL ELIMINAR */}

      {contactoAEliminar && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">

            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Confirmar eliminación
            </h2>

            <p className="text-gray-600 mb-4">
              ¿Seguro que deseas eliminar el contacto
              <span className="font-semibold ml-1">
                {contactoAEliminar.nombre}
              </span>?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setContactoAEliminar(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancelar
              </button>

              <button
                onClick={eliminarConfirmado}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Eliminar
              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}