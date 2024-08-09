import { useState, useEffect } from 'react';
import './App.css';
import { Converter } from './components/Converter';
import { UIButton } from './components/Button';
import { UIUsers } from './components/users';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);

  const [passwordRegister, setPasswordRegister] = useState('');
  const [userRegister, setUserRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');

  const [users, setUsers] = useState([]);

  function setUser(event) {
    setUsuario(event.target.value);
  }

  function setPassword(event) {
    setClave(event.target.value);
  }

  function handleRegisterUser(event){
    setUserRegister(event.target.value);
  }

  function handleRegisterPassword(event){
    setPasswordRegister(event.target.value);
  }

  function handleRegisterEmail(event){
    setEmailRegister(event.target.value);
  }

  async function registerNewUser(event){
    event.preventDefault();
    const data = {
      name: userRegister,
      password: passwordRegister,
      email: emailRegister
    };
    const allData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    
    try {
      await fetch('https://sena-27cfe8a4f38c.herokuapp.com/register', allData);
      fetchUsers();
    } catch(error) {
      console.error(error);
    }
  }

  async function loginBasic(event) {
    event.preventDefault();

    const data = {
      email: usuario,
      password: clave
    };

    const allData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const peticion = await fetch('https://sena-27cfe8a4f38c.herokuapp.com/login', allData);
    const response = await peticion.json();

    localStorage.setItem('token', response.token);

    if (peticion.ok) {
      setLogueado(true);
      fetchUsers();
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
    const peticion = await fetch('https://sena-27cfe8a4f38c.herokuapp.com/validate', data);
    if (peticion.ok) {
      setLogueado(true);
      fetchUsers();
    } else {
      localStorage.removeItem('token');
      setLogueado(false);
    }
  }

  async function fetchUsers() {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = await fetch('https://sena-27cfe8a4f38c.herokuapp.com/users', data);
    const users = await response.json();
    setUsers(users);
  }

  async function deleteUser(id) {
    const data = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    await fetch(`https://sena-27cfe8a4f38c.herokuapp.com/users/${id}`, data);
    fetchUsers();   }

  async function editUser(user) {
    const newUsuario = prompt('Enter new username:', user.usuario);
    const newClave = prompt('Enter new password:', '');
    if (newUsuario && newClave) {
      const data = {
        usuario: newUsuario,
        clave: newClave
      };
      const allData = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      };
      await fetch(`http://localhost:3000/users/${user.id}`, allData);
      fetchUsers();
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  if (logueado) {
    return (
      <>
        <Converter />
        <div className="user-list">
          {users.map(user => (
            <UIUsers key={user.id} data={user} onDelete={deleteUser} onEdit={editUser} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{display:'flex', gap: '12px'}}>
        <div>
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
            <UIButton name='Send' classColor='button-input' callback={loginBasic}/>
          </form>
        </div> 
        <div>
          <h1>Register</h1>
          <form className="form">
            <input
              className='input'
              placeholder="user"
              type="text"
              name="usuario"
              id="usuario"
              value={userRegister}
              onChange={handleRegisterUser}
            />
            <input
              className='input'
              placeholder="email"
              type="email"
              name="email"
              id="email"
              value={emailRegister}
              onChange={handleRegisterEmail}
            />
            <input
              className='input'
              placeholder="password"
              type="password"
              name="clave"
              id="clave"
              value={passwordRegister}
              onChange={handleRegisterPassword}
            />
            <UIButton name='Send' classColor='button-input' callback={registerNewUser}/>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
