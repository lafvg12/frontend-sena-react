import { useState, useEffect } from 'react';
import './App.css';
import { Converter } from './components/Converter';
import { UIButton } from './components/Button';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);

  function setUser(event) {
    setUsuario(event.target.value);
  }

  function setPassword(event) {
    setClave(event.target.value);
  }

  async function loginBasic(event) {
    event.preventDefault();

    const data = {
      usuario: usuario,
      clave: clave
    };

    const allData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const peticion = await fetch('http://localhost:3000/login', allData);
    const response = await peticion.json();

    localStorage.setItem('token', response.token);

    if (peticion.ok) {
      setLogueado(true);
    } else {
      alert('Not authorized');
    }
  }

  async function validateToken() {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    const peticion = await fetch('http://localhost:3000/validate', data);
    if (peticion.ok) {
      setLogueado(true);
    }else{
      localStorage.removeItem('token');
      setLogueado(false);
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  if (logueado) {
    return <Converter />;
  }

  return (
    <>
      <h1>Login</h1>
      <form className="form">
        <input
          className='input'
          placeholder="user"
          type="text"
          name="usuario"
          id="usuario"
          value={usuario}
          onChange={setUser}
        />
        <input
          className='input'
          placeholder="password"
          type="password"
          name="clave"
          id="clave"
          value={clave}
          onChange={setPassword}
        />
        <UIButton name='Send' classColor='button-input'  callback={loginBasic}/>
      </form>
    </>
  );
}

export default App;