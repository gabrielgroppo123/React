import { Link } from "react-router-dom"
export default function Home(){

    return (
        <div>
            <h1>Bem vindo ao React</h1>
            <h2>Ir para</h2>
            <ul>
                <li>
                    <Link to='/sobremim'>Sobre mim</Link>    
                </li>
                <li>
                    <Link to='/hobby'>Hobby</Link>    
                </li>
            </ul>
        </div>
    )
}