import axios from 'axios'
import { useState } from 'react'
import './index.css'

export default function Ex5() {
    const [eventos, setEventos] = useState([]);
    const [filtroGratuito, setFiltroGratuito] = useState(false);

    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [local, setLocal] = useState('');
    const [data_evento, setData_evento] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [gratuito, setGratuito] = useState(false);
    const [banner_url, setBanner_url] = useState('');

    async function editarEvento(evento) {
        setTitulo(evento.titulo);
        setLocal(evento.local);
        setData_evento(evento.data_evento);
        setCapacidade(evento.capacidade);
        setGratuito(evento.gratuito);
        setBanner_url(evento.banner_url);
        setId(evento.id);
    }

    async function deletarEvento(id) {
        let URL = 'http://localhost:5010/eventos/' + id;
        await axios.delete(URL);

        alert('Evento ' + id + ' deletado com sucesso!');
        listarEventos();
    }

    async function cadastrarEvento() {
        let novoEvento = {
            titulo,
            local,
            data_evento,
            capacidade: Number(capacidade),
            gratuito,
            banner_url
        };
        
        if (id === '') {
            let URL = 'http://localhost:5010/eventos';
            let resp = await axios.post(URL, novoEvento);
            alert('Evento criado com ID: ' + resp.data.id);
        }
        else {
            let URL = 'http://localhost:5010/eventos/' + id;
            await axios.put(URL, novoEvento);
            alert('Evento ' + id + ' atualizado com sucesso!');
        }

        limparCampos();
        listarEventos();
    }

    function limparCampos() {
        setTitulo('');
        setLocal('');
        setData_evento('');
        setCapacidade('');
        setGratuito(false);
        setBanner_url('');
        setId('');
    }

    async function listarEventos() {
        let URL = 'http://localhost:5010/eventos';
        let resp = await axios.get(URL);
        setEventos(resp.data);
    }

    const eventosFiltrados = eventos.filter(evento =>
        filtroGratuito ? evento.gratuito === true : true
    );

    return (
        <div className='pagina-usuario'>
            <h1>API - Eventos</h1>

            <section>
                <h2>Cadastro</h2>
                <div className='cadastro'>
                    <input 
                        type="text" 
                        placeholder='Título' 
                        value={titulo} 
                        onChange={e => setTitulo(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder='Local' 
                        value={local} 
                        onChange={e => setLocal(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        placeholder='Data do Evento' 
                        value={data_evento} 
                        onChange={e => setData_evento(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder='Capacidade' 
                        value={capacidade} 
                        onChange={e => setCapacidade(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder='URL do Banner' 
                        value={banner_url} 
                        onChange={e => setBanner_url(e.target.value)} 
                    />
                    <label>
                        Gratuito: 
                        <input 
                            type="checkbox"  
                            checked={gratuito} 
                            onChange={e => setGratuito(e.target.checked)} 
                        />
                    </label>
                    <button onClick={cadastrarEvento}>
                        {id === '' ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </div>
            </section>

            <section>
                <h2>Lista de Eventos</h2>
                <button onClick={listarEventos}>Listar Eventos</button>

                <label style={{marginLeft: '15px'}}>
                    Mostrar apenas gratuitos
                    <input 
                        type="checkbox" 
                        checked={filtroGratuito} 
                        onChange={e => setFiltroGratuito(e.target.checked)} 
                        style={{marginLeft: '5px'}}
                    />
                </label>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Local</th>
                            <th>Data</th>
                            <th>Capacidade</th>
                            <th>Gratuito</th>
                            <th>Banner</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventosFiltrados.map(item => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.titulo}</td>
                                <td>{item.local}</td>
                                <td>{item.data_evento}</td>
                                <td>{item.capacidade}</td>
                                <td>{item.gratuito ? "Sim" : "Não"}</td>
                                <td>
                                    {item.banner_url && 
                                        <img src={item.banner_url} alt={item.titulo} style={{width: '50px'}} />
                                    }
                                </td>
                                <td>
                                    <button onClick={() => deletarEvento(item.id)}>Deletar</button>
                                </td>
                                <td>
                                    <button onClick={() => editarEvento(item)}>Editar</button>
                                </td>
                            </tr> 
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
