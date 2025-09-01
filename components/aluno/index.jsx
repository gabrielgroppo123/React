import './index.css';
export default function Aluno(props){

    return(
        <div className='comp-aluno'>
            <h1>{props.nome}</h1>
            <h2>{props.curso}</h2>
            <h3>2° Semestre</h3>
            <h4>Projeto Integrador</h4>            
        </div>


    )
        

    
}