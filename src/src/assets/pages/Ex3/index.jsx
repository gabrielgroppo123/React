import axios from 'axios'
import { useState } from 'react'
import './index.css'

export default function Ex3() {
    const [filmes, setFilmes] = useState([]);
    const [filtro, setFiltro] = useState('');

    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [diretor, setDiretor] = useState('');
    const [data_lancamento, setData_lancamento] = useState('');
    const [duracao_minutos, setDuracao_minutos] = useState('');
    const [em_cartaz, setEm_cartaz] = useState(false);
    const [cartaz_url, setCartaz_url] = useState('');

    

    async function editarFilme(filme) {
        setTitulo(filme.titulo);
        setDiretor(filme.diretor);
        setData_lancamento(filme.data_lancamento);
        setDuracao_minutos(filme.duracao_minutos);
        setEm_cartaz(filme.em_cartaz);
        setCartaz_url(filme.cartaz_url);
        setId(filme.id);
    }

    async function deletarFilme(id) {
        let URL = 'http://localhost:5010/filmes/' + id;
        await axios.delete(URL);

        alert('Filme ' + id + ' deletado com sucesso!');
        listarFilmes();
    }

    async function cadastrarFilme() {
        let novoFilme = {
            titulo,
            diretor,
            data_lancamento,
            duracao_minutos: Number(duracao_minutos),
            em_cartaz,
            cartaz_url
        };
        
        if (id === '') {
            let URL = 'http://localhost:5010/filmes';
            let resp = await axios.post(URL, novoFilme);
            alert('Filme criado com ID: ' + resp.data.id);
        }
        else {
            let URL = 'http://localhost:5010/filmes/' + id;
            await axios.put(URL, novoFilme);
            alert('Filme ' + id + ' atualizado com sucesso!');
        }

        limparCampos();
        listarFilmes();
    }

    function limparCampos() {
        setTitulo('');
        setDiretor('');
        setData_lancamento('');
        setDuracao_minutos('');
        setEm_cartaz(false);
        setCartaz_url('');
        setId('');
    }

    async function listarFilmes() {
        let URL = 'http://localhost:5010/filmes';
        let resp = await axios.get(URL);
        setFilmes(resp.data);
    }

    
    const filmesFiltrados = filmes.filter(filme =>filme.titulo.toLowerCase().includes(filtro.toLowerCase()));

    return (
        <div className='pagina-usuario'>
            <h1>API - Filmes</h1>

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
                        placeholder='Diretor' 
                        value={diretor} 
                        onChange={e => setDiretor(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        placeholder='Data de Lançamento' 
                        value={data_lancamento} 
                        onChange={e => setData_lancamento(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder='Duração (minutos)' 
                        value={duracao_minutos} 
                        onChange={e => setDuracao_minutos(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder='URL do Cartaz' 
                        value={cartaz_url} 
                        onChange={e => setCartaz_url(e.target.value)} 
                    />
                    <label>
                        Em Cartaz: 
                        <input 
                            type="checkbox"  
                            checked={em_cartaz} 
                            onChange={e => setEm_cartaz(e.target.checked)} 
                        />
                    </label>
                    <button onClick={cadastrarFilme}>
                        {id === '' ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </div>
            </section>

            <section>
                <h2>Lista de Filmes</h2>
                <button onClick={listarFilmes}>Listar Filmes</button>

                
                <input 
                    type="text" 
                    placeholder="Buscar por título..." 
                    value={filtro} 
                    onChange={e => setFiltro(e.target.value)} 
                    style={{margin: '10px 0', padding: '5px', width: '300px'}}
                />

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Diretor</th>
                            <th>Data Lançamento</th>
                            <th>Duração (min)</th>
                            <th>Em Cartaz</th>
                            <th>Cartaz</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filmesFiltrados.map(item => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.titulo}</td>
                                <td>{item.diretor}</td>
                                <td>{item.data_lancamento}</td>
                                <td>{item.duracao_minutos}</td>
                                <td>{item.em_cartaz ? "Sim" : "Não"}</td>
                                <td>
                                    {item.cartaz_url && 
                                        <img src={item.cartaz_url} alt={item.titulo} style={{width: '50px'}} />
                                    }
                                </td>
                                <td>
                                    <button onClick={() => deletarFilme(item.id)}>Deletar</button>
                                </td>
                                <td>
                                    <button onClick={() => editarFilme(item)}>Editar</button>
                                </td>
                            </tr> 
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
