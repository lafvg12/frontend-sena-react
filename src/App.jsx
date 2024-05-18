import { useState, useEffect } from 'react'
import './App.css'
import { Converter } from './components/Converter'

// import { UIButton } from './components/Button'
function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logueado, setLogueado] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }

  async function ingresar() {

    const data = {
      usuario: usuario,
      clave: clave
    }

    const allData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const peticion = await fetch('http://localhost:3000/login',allData)
    const response = await peticion.json()
    console.log("🚀 ~ ingresar ~ response:", response)
    localStorage.setItem('token', response.token)

    if (peticion.ok) {
      setLogueado(true)
    } else {
      alert('Not authorized')
    }
  }

  async function validar() {

    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    const peticion = await fetch('http://localhost:3000/validate', data)
    if (peticion.ok) {
      setLogueado(true)
    }
  }

  useEffect(() => {
    validar()
  }, [])

  if (logueado) {
    return <Converter />
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <input placeholder='Usuario' type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
      <input placeholder='Clave' type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>
    </>
  )
}

export default App
