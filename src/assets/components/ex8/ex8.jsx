import { useState } from "react";
import "./ex8.css"
export default function Ex8() {
  const [numero, setNumero] = useState("");
  const [tabuada, setTabuada] = useState([]);

  function alteraNumero(e) {
    setNumero(e.target.value);
  }

  function calcular() {
    const n = Number(numero);
    let resultado = [];

    for (let i = 0; i <= 10; i++) {
      resultado.push(`${n} × ${i} = ${n * i}`);
    }

    setTabuada(resultado);
  }

  return (
    <div className="container">
      <h1>Tabuada</h1>

      <input type="number" value={numero} onChange={alteraNumero} placeholder="Informe um número"/>
      <label> &nbsp; </label>
      <button onClick={calcular}>OK</button>

      <div>
        {tabuada.map((linha, index) => (
          <p key={index}>{linha}</p>
        ))}
      </div>
    </div>
  );
}