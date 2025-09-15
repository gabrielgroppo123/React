import { Link } from "react-router-dom"
export default function Home(){
    return(
        <div>
            <h1>Aqui é a Home</h1>
            <p>
                <Link to='/exercicios'>Ir para Exercicios</Link>
            </p>
        </div>
    )
}