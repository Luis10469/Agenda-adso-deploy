import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Agenda from "./pages/Agenda"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {

  return (

    <Routes>

      {/* redirección inicial */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* login */}
      <Route path="/login" element={<Login />} />

      {/* agenda protegida */}
      <Route
        path="/agenda"
        element={
          <ProtectedRoute>
            <Agenda />
          </ProtectedRoute>
        }
      />

    </Routes>

  )

}