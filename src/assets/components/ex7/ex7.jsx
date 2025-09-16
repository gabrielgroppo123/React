import { useState } from "react";
import "./ex7.css"

export default function Ex7() {
  const [pessoas, setPessoas] = useState("");
  const [carne, setCarne] = useState(0);
  const [linguica, setLinguica] = useState(0);
  const [frango, setFrango] = useState(0);
  const [custoCarne, setCustoCarne] = useState(0);
  const [custoLinguica, setCustoLinguica] = useState(0);
  const [custoFrango, setCustoFrango] = useState(0);
  const [custoTotal, setCustoTotal] = useState(0);
  const [custoPorPessoa, setCustoPorPessoa] = useState(0);

  function alteraPessoas(e) {
    setPessoas(e.target.value);
  }

  function calcular() {
    const qtdPessoas = Number(pessoas);

  
    const carneKg = qtdPessoas * 0.3;   
    const linguicaKg = qtdPessoas * 0.2; 
    const frangoKg = qtdPessoas * 0.15;  

 
    const precoCarne = 50;
    const precoLinguica = 28;
    const precoFrango = 22;


    const custoCarneTotal = carneKg * precoCarne;
    const custoLinguicaTotal = linguicaKg * precoLinguica;
    const custoFrangoTotal = frangoKg * precoFrango;

    const total = custoCarneTotal + custoLinguicaTotal + custoFrangoTotal;
    const porPessoa = total / qtdPessoas;

    
    setCarne(carneKg);
    setLinguica(linguicaKg);
    setFrango(frangoKg);
    setCustoCarne(custoCarneTotal);
    setCustoLinguica(custoLinguicaTotal);
    setCustoFrango(custoFrangoTotal);
    setCustoTotal(total);
    setCustoPorPessoa(porPessoa);
  }

  return (
    <div className="container">
      <h1>Churrasco de Domingo</h1>

      <input type="number" value={pessoas} onChange={alteraPessoas}placeholder="Informe a qtd de Pessoas"/>
      <br /><br />
      <button onClick={calcular}>Calcular</button>

      {custoTotal > 0 && (
        <div>
          <h2>Quantidades</h2>
          <p>Carne: {carne.toFixed(1)} kg</p>
          <p>Linguiça: {linguica.toFixed(1)} kg</p>
          <p>Frango: {frango.toFixed(1)} kg</p>

          <h2>Custo</h2>
          <p>Carne: R$ {custoCarne.toFixed(2)}</p>
          <p>Linguiça: R$ {custoLinguica.toFixed(2)}</p>
          <p>Frango: R$ {custoFrango.toFixed(2)}</p>

          <h2>Rateio</h2>
          <p>Custo Total: R$ {custoTotal.toFixed(2)}</p>
          <p>Custo por Pessoa: R$ {custoPorPessoa.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}