import { Link } from "react-router-dom"
export default function Exercicios(){
    return(
        <div>
            <h1>Exercicios</h1>
            <p><Link to='/ex1'>Exercicio 1</Link></p>
            <p><Link to='/ex2'>Exercicio 2</Link></p>
            <p><Link to='/ex3'>Exercicio 3</Link></p>
            <p><Link to='/ex4'>Exercicio 4</Link></p>
            <p><Link to='/ex5'>Exercicio 5</Link></p>
            <p><Link to='/ex6'>Exercicio 6</Link></p>
        </div>
    )
}