import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()

    if (email === "hola@sena.com" && password === "hola") {

      login()
      navigate("/agenda")

    } else {

      alert("Credenciales incorrectas")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Iniciar sesión
        </h2>

        <input
          type="email"
          placeholder="Correo"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
        >
          ingresar 
        </button>

      </form>

    </div>

  )
}