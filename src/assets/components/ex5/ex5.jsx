import { use, useState } from "react"
import "./ex5.css"
export default function Ex5(props){

    let valordolar = 5.34;
    const[qtdreais, setQtdreais] = useState("");
    const[resultado,setResultado] = useState("");
   

    function alterarQtdreais(e) {
        let novo = e.target.value;
        setQtdreais(novo);
    }

    function calcular() {
        let res = Number(qtdreais)/ valordolar;
        setResultado(res);
    }
    

    return(
        <div className="container">
            <h1>Câmbio de dolar</h1>
                <div>
                    <div>
                        <label> &nbsp; </label>
                        <input type="text" value={qtdreais} onChange={alterarQtdreais} placeholder='Quantia em reais' size={20}/>
                        <label> &nbsp; </label>
                        Valor do Dólar: R${valordolar}
                        
                        <br />
                        <br />
                        <label> &nbsp; </label>
                        <button onClick={calcular}> Calcular </button>
                        
                    </div>
                    
                    <div>
                        <br/>
                        <label> Conversão: ${resultado}</label>
                    </div>
                </div>
            </div>
    )    
}