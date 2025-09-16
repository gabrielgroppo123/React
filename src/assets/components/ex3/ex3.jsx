import { use, useState } from "react"
import "./ex3.css"
export default function Ex3(props){

    
    const[qtdpaginas, setQtdpaginas] = useState("");
    const[secporpagina, setSecporpagina] = useState("");
    const[resultado,setResultado] = useState("");
    const[nome,setNome] = useState("");
    const[nomelivro,setNomelivro] = useState("");
    

    function alterarQtdpaginas(e) {
        let novo = e.target.value;
        setQtdpaginas(novo);
    }

    function alterarSecporpagina(e){
        let novo = e.target.value;
        setSecporpagina(novo);
    }

    function alterarNome(e){
        let novo = e.target.value;
        setNome(novo);
    }

    function alterarNomelivro(e){
        let novo = e.target.value;
        setNomelivro(novo);
    }

    function calcular() {
        let res = (Number(qtdpaginas)* Number(secporpagina))/3600;
        setResultado(res);
    }
    

    return(
        <div className="container">
            <h1>Você lê rápido?</h1>
                <div>
                    <div>
                        <label> &nbsp; </label>
                        <input type="text" value={nome} onChange={alterarNome} placeholder='Nome' size={20}/>
                        <label> &nbsp; </label>
                        <input type="text" value={qtdpaginas} onChange={alterarQtdpaginas} placeholder='Quantidade de paginas' size={20}/>
                        <br />
                        <br />
                        <label> &nbsp; </label>
                        <input type="text" value={nomelivro} onChange={alterarNomelivro} placeholder='Livro' size={20}/>
                        <label> &nbsp; </label>
                        <input type="text" value={secporpagina} onChange={alterarSecporpagina} placeholder='Segundos por pagina' size={20}/>
                        <label> &nbsp; </label>
                        <button onClick={calcular}> Calcular </button>
                        
                    </div>
                    <div>
                        <br/>
                        <label> {nome}, você finalizará a leitura do livro {nomelivro} em aproximadamente {resultado} horas</label>
                    </div>
                </div>
            </div>
    )    
}