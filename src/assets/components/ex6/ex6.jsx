import { useState } from "react";
import "./ex6.css"
export default function Ex6() {
  const [primaria1, setPrimaria1] = useState("");
  const [primaria2, setPrimaria2] = useState("");
  const [resultado, setResultado] = useState("");


  function corprimaria1(e) {
    setPrimaria1(e.target.value);
  }

  function corprimaria2(e) {
    setPrimaria2(e.target.value);
  }

  function calcular() {
    const cor1 = primaria1.toLowerCase();
    const cor2 = primaria2.toLowerCase();

    if (
      (cor1 === "azul" && cor2 === "amarelo") ||
      (cor1 === "amarelo" && cor2 === "azul")
    ) {
      setResultado("Verde");
    } else if (
      (cor1 === "azul" && cor2 === "vermelho") ||
      (cor1 === "vermelho" && cor2 === "azul")
    ) {
      setResultado("Roxo");
    } else if (
      (cor1 === "amarelo" && cor2 === "vermelho") ||
      (cor1 === "vermelho" && cor2 === "amarelo")
    ) {
      setResultado("Laranja");
    } else {
      setResultado("Combinação inválida");
    }
  }

  return (
    <div className="container">
      <h1>Combinador de Cores Primárias</h1>
      <div>
        <input type="text" value={primaria1} onChange={corprimaria1} placeholder="Cor primária" size={10}/>
        {" "}combinado com{" "}
        <input type="text" value={primaria2} onChange={corprimaria2} placeholder="Cor primária" size={10}/>
        <br />
        <br />
        <button onClick={calcular}>Calcular</button>

        <div>
          <br />
          <label>Cor resultante: {resultado}</label>
        </div>
      </div>
    </div>
  )
}