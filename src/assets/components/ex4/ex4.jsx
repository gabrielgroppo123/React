import { use, useState } from "react"
import "./ex4.css"
export default function Ex4(props){

    let aprovado;
    
    const[nota1, setNota1] = useState("");
    const[nota2, setNota2] = useState("");
    const[nota3, setNota3] = useState("");
    const[resultado, setResultado] = useState("");
    
    function alterarNota1(e) {
        let novo = e.target.value;
        setNota1(novo);
    }

     function alterarNota2(e) {
        let novo = e.target.value;
        setNota2(novo);
    }
     function alterarNota3(e) {
        let novo = e.target.value;
        setNota3(novo);
    }

    function calcularmedia() {
        let res = (Number(nota1)+ Number(nota2) + Number(nota3))/3 ;
        setResultado(res);
    }
    
    if (resultado >=6){
        aprovado = "Aprovado"
    }
    else{
        aprovado = "Reprovado"
    }

    return(
        <div className="container">
            <h1>Boletim Aluno</h1>
                <div>
                    <div>
                        <div>
                            <label> &nbsp; </label>
                            <input type="text" placeholder='Nome' size={20}/>
                            <label> &nbsp; </label>
                            <input type="text" placeholder='Disciplina' size={10}/>
                        </div>
                        <br />
                        <div>
                            <label> &nbsp; </label>
                            <input type="text" value={nota1} onChange={alterarNota1} placeholder='Nota 01' size={10}/>
                            <label> &nbsp; </label>
                            <input type="text" value={nota2} onChange={alterarNota2} placeholder='Nota 02' size={10}/>
                            <label> &nbsp; </label>
                            <input type="text" value={nota3} onChange={alterarNota3} placeholder='Nota 03' size={10}/>
                            <label> &nbsp; </label>
                            <button onClick={calcularmedia}> Calcular </button>
                        </div>
                    </div>
                    <div>
                        <br/>
                        <label> Media: {resultado}</label>
                        <br />  
                        <label> Situação: {aprovado}</label>
                    </div>
                </div>
            </div>
    )    
}