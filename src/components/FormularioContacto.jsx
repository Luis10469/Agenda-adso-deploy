import { useState, useEffect, useRef } from "react";

export default function FormularioContacto({
  onAgregar,
  onActualizar,
  contactoEditando,
  cancelarEdicion
}){

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState("");

  const nombreInputRef = useRef(null);

  // 🔥 Cuando se edita un contacto
  useEffect(() => {
    if (contactoEditando) {
      setForm({
        nombre: contactoEditando.nombre || "",
        telefono: contactoEditando.telefono || "",
        correo: contactoEditando.correo || "",
        etiqueta: contactoEditando.etiqueta || "",
      });

      setTimeout(() => {
        nombreInputRef.current?.focus();
      }, 100);
    }
  }, [contactoEditando]);

  const validarFormulario = () => {
    const nuevoErrores = {};

    if (!form.nombre.trim()) {
      nuevoErrores.nombre = "El nombre es obligatorio";
    }

    if (!form.telefono.trim()) {
      nuevoErrores.telefono = "El teléfono es obligatorio";
    } else if (form.telefono.trim().length < 10) {
      nuevoErrores.telefono = "El teléfono debe tener al menos 10 dígitos";
    }

    if (!form.correo.trim()) {
      nuevoErrores.correo = "El correo es obligatorio";
    } else if (!form.correo.includes("@")) {
      nuevoErrores.correo = "El correo debe contener el símbolo @";
    }

    setErrores(nuevoErrores);
    return Object.keys(nuevoErrores).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    setErrores((prev) => ({
      ...prev,
      [name]: "",
    }));

    setExito("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true);

      if (contactoEditando) {
        await onActualizar(contactoEditando.id, form);
        setExito("El contacto fue actualizado correctamente ✔️");
      } else {
        await onAgregar(form);
        setExito("El contacto fue guardado correctamente ✔️");
      }

      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({});

      setTimeout(() => {
        setExito("");
      }, 3000);

    } catch (error) {
      setErrores({
        api: "No se pudo guardar el contacto. Intenta nuevamente.",
      });
    } finally {
      setEnviando(false);
    }
  };

 

  const handleCancelar = () => {

  // limpiar formulario
  setForm({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  setErrores({});
  setExito("Edición cancelada");

  // salir del modo edición
  cancelarEdicion();

  setTimeout(() => {
    setExito("");
  }, 3000);
};

  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-6 p-6 rounded-2xl shadow-sm border transition-all
        ${contactoEditando
          ? "bg-yellow-50 border-yellow-300"
          : "bg-white border-gray-200"
        }`}
    >

      {/* 🔥 Banner modo edición */}
      {contactoEditando && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-xl">
          ✏️ Estás editando el contacto:
          <span className="font-semibold ml-1">
            {contactoEditando.nombre}
          </span>
        </div>
      )}

      {exito && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          {exito}
        </div>
      )}

      {errores.api && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {errores.api}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            ref={nombreInputRef}
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
          />
          {errores.nombre && (
            <p className="text-red-500 text-sm mt-1">
              {errores.nombre}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="telefono"
            value={form.telefono}
            onChange={onChange}
          />
          {errores.telefono && (
            <p className="text-red-500 text-sm mt-1">
              {errores.telefono}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <p className="text-red-500 text-sm mt-1">
            {errores.correo}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <div className="flex gap-3">

        <button
          disabled={enviando}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-sm text-white transition
            ${enviando
              ? "bg-gray-400 cursor-not-allowed"
              : contactoEditando
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
        >
          {enviando && (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          )}

          {enviando
            ? "Guardando..."
            : contactoEditando
              ? "Actualizar contacto"
              : "Agregar contacto"}
        </button>

        {contactoEditando && (
          <button
            type="button"
            onClick={handleCancelar}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
        )}
        

      </div>
    </form>
  );
}