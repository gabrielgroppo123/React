import { useState } from "react"
export default function Ex1(props){



    let valorinteira = 50;
    const[qtdinteira,setQtdinteira] = useState("");
    const[qtdmeia,setQtdmeia] = useState("");
    const[resultado,setResultado] = useState("");

    function alterarQtdinteira(e) {
        let novo = e.target.value;
        setQtdinteira(novo);
    }

    function alterarQtdmeia(e) {
        let novo = e.target.value;
        setQtdmeia(novo);
    }

    function somar() {
        let res = Number(qtdinteira)*valorinteira + Number(qtdmeia)*(valorinteira/2);
        setResultado(res);
    }

    return(
        <div className='comp-ex1'>
            <h1>Tickets Cinemark</h1>
                <div>
                    <div>
                        <label> &nbsp; </label>
                        <input type="text" value={qtdinteira} onChange={alterarQtdinteira} placeholder='Quantidade de ingressos "Inteira"' size={25}/>
                        <br />
                        <label> &nbsp; </label>
                        <input type="text" value={qtdmeia} onChange={alterarQtdmeia} placeholder='Quantidade de ingressos "Meia"' size={25}/>
                        <label> &nbsp; </label>
                        <button onClick={somar}> Calcular </button>
                    </div>
                    <div>
                        <br />
                        <label> Total: ${resultado}</label>
                    </div>
                </div>
            </div>
    )    
}