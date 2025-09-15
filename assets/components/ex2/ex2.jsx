import { use, useState } from "react"
export default function Ex2(props){



    let valorinteira = 50;
    const[qtdingressos, setQtdintgressos] = useState("");
    const[resultado,setResultado] = useState("");
    const[checado, setChecado] = useState(false);

    function alterarQtdingressos(e) {
        let novo = e.target.value;
        setQtdintgressos(novo);
    }

    function calcular() {
        let res = Number(qtdingressos)* (resultado  ? valorinteira/2 : valorinteira);
        setResultado(res);
    }
    function alterarChecado(e) {
        let valor = e.target.checked;
        setChecado(valor);
    }

    return(
        <div className='comp-ex2'>
            <h1>Tickets Cinemark</h1>
                <div>
                    <div>
                        <label> &nbsp; </label>
                        <input type="text" value={qtdingressos} onChange={alterarQtdingressos} placeholder='Quantidade de ingressos' size={20}/>
                        <label> &nbsp; </label>
                        <button onClick={calcular}> Calcular </button>
                        <p>
                            <input type='checkbox' checked={checado} onChange={alterarChecado} />
                            Meia entrada
                        </p>
                    </div>
                    <div>
                        <br/>
                        <label> Total: ${resultado}</label>
                    </div>
                </div>
            </div>
    )    
}