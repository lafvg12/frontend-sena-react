import { useState } from 'react';
import './Converter.css';

function Converter() {
  const [textoAVoz, setTextoAVoz] = useState('');
  const [vozATexto, setVozATexto] = useState('');

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

  return (
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
  );
}

export { Converter };
