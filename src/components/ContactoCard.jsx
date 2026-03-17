// Este componente muestra un contacto individual.
// Incluye nombre, teléfono, correo, etiqueta y los botones de editar y eliminar.

export default function ContactoCard({
  nombre,
  correo,
  telefono,
  etiqueta,
  busqueda,
  onEliminar,
  onEditar
}) {

  const resaltarTexto = (texto = "") => {
    if (!busqueda) return texto;

    const regex = new RegExp(`(${busqueda})`, "gi");
    return texto.replace(regex, "<mark>$1</mark>");
  };

const obtenerIniciales = (nombre = "") => {

  if (!nombre) return "";

  const palabras = nombre.split(" ");

  return palabras
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");

};

const obtenerColor = (nombre = "") => {

  const colores = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500"
  ];

  let suma = 0;

  for (let i = 0; i < nombre.length; i++) {
    suma += nombre.charCodeAt(i);
  }

  return colores[suma % colores.length];
};

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 flex items-center justify-between">

      <div className="flex items-start gap-4">

        {/* Avatar automático */}
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${obtenerColor(nombre)} text-white font-bold text-sm`}>
          {obtenerIniciales(nombre)}
        </div>

        {/* Información del contacto */}
        <div className="space-y-1">

          {/* Nombre */}
          <h3
            className="text-xl font-semibold text-gray-800"
            dangerouslySetInnerHTML={{
              __html: resaltarTexto(nombre),
            }}
          />

          {/* Teléfono */}
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-purple-500 text-lg">📞</span>
            <span
              dangerouslySetInnerHTML={{
                __html: resaltarTexto(telefono),
              }}
            />
          </p>

          {/* Correo */}
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-purple-500 text-lg">✉️</span>
            <span
              dangerouslySetInnerHTML={{
                __html: resaltarTexto(correo),
              }}
            />
          </p>

          {/* Etiqueta */}
          {etiqueta && (
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mt-2">
              <span
                dangerouslySetInnerHTML={{
                  __html: resaltarTexto(etiqueta),
                }}
              />
            </span>
          )}

        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-2">

        {/* Botón editar */}
        <button
          onClick={() => onEditar()}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
        >
          Editar
        </button>

        {/* Botón eliminar */}
        <button
          onClick={onEliminar}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}