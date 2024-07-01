import { useState } from 'react';
import './Converter.css';
import { UIButton } from '../Button';

import { UIUsers } from '../users'

function Converter() {
  const [textoAVoz, setTextoAVoz] = useState('');
  const [vozATexto, setVozATexto] = useState('');
  const [alluser, setAlluser] = useState([])

  function cambiarTexto(evento) {
    setTextoAVoz(evento.target.value);
  }

  function convertirTextoAVoz() {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(textoAVoz);
    synth.speak(utterThis);
  }

  function resultado(event) {
    setVozATexto(event.results[0][0].transcript);
  }

  function grabarVozATexto() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.start();
    recognition.onresult = resultado;
  }

   const getUsers = async ( ) => {
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    try{
      const data = await fetch('http://localhost:3000/users', options)
      const parseData = await data.json()
      setAlluser([...parseData])
    }catch(error){
      console.error(error)
    }
  }

  return (
    <>
    <div className="container">
      <h1 className="title">Conversor TTS y STT</h1>
      <h3 className="subtitle">Conversor de texto a voz</h3>
      <input
        className="input-converter"
        type="text"
        id="textoAVoz"
        value={textoAVoz}
        onChange={cambiarTexto}
      />
      <button className="button" onClick={convertirTextoAVoz}>Convertir</button>
      <h3 className="subtitle">Conversor de voz a texto</h3>
      <button className="button" onClick={grabarVozATexto}>Grabar</button>
      <div className="outputText">{vozATexto}</div>
    </div>
    {
      alluser.length > 0  && alluser.map((user, index) => {
        return <>
          <UIUsers data={user} />
        </>
        
      })
    }
    <UIButton name='get user' classColor='button-input'  callback={getUsers}/>
    </>
  );
}

export { Converter };
