import Aluno from '../../components/aluno';
import './index.css'
import {Link} from 'react-router-dom';


export default function Home(){

    return(
        <div className='pagina-home'>
            <h1 className='titulo'>Home</h1>
            <hr />
            <p>Aqui é a Home</p>
            <p>
                <Link to="/contato">Ir para Contato</Link>
            </p>

            <Aluno nome='Gabriel' curso='ADS'></Aluno>
            <Aluno nome='Guilherme' curso='ADS'></Aluno>
            <Aluno nome='Rafael' curso='ADS'></Aluno>
            <Aluno nome='Guilherme' curso='ADS'></Aluno>
            <Aluno nome='Gustavo' curso='ADS'></Aluno>
        </div>

        
    )
}