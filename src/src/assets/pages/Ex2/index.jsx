import axios from 'axios'
import { useState } from 'react'
import './index.css'

export default function Ex2() {
    const [livros, setLivros] = useState([]);

    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [data_publicacao, setData_publicacao] = useState('');
    const [disponivel, setDisponivel] = useState(false);
    const [capa_url, setCapa_url] = useState('');

    async function editarLivro(livro) {
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setGenero(livro.genero);
        setData_publicacao(livro.data_publicacao);
        setDisponivel(livro.disponivel);
        setCapa_url(livro.capa_url);
        setId(livro.id);
    }

    async function deletarLivro(id) {
        let URL = 'http://localhost:5010/livros/' + id;
        await axios.delete(URL);

        alert('Livro ' + id + ' deletado com sucesso!');
        listarLivros();
    }

    async function cadastrarLivro() {
        let novoLivro = {
            titulo,
            autor,
            genero,
            data_publicacao,
            disponivel,
            capa_url
        };
        
        if (id === '') {
            let URL = 'http://localhost:5010/livros';
            let resp = await axios.post(URL, novoLivro);
            alert('Livro criado com ID: ' + resp.data.id);
        }
        else {
            let URL = 'http://localhost:5010/livros/' + id;
            await axios.put(URL, novoLivro);
            alert('Livro ' + id + ' atualizado com sucesso!');
        }

        limparCampos();
        listarLivros();
    }

    function limparCampos() {
        setTitulo('');
        setAutor('');
        setGenero('');
        setData_publicacao('');
        setDisponivel(false);
        setCapa_url('');
        setId('');
    }

    async function listarLivros() {
        let URL = 'http://localhost:5010/livros';
        let resp = await axios.get(URL);
        setLivros(resp.data);
    }

    return (
        <div className='pagina-usuario'>
            <h1>API - Livros</h1>

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
                        placeholder='Autor' 
                        value={autor} 
                        onChange={e => setAutor(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder='Gênero' 
                        value={genero} 
                        onChange={e => setGenero(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        placeholder='Data de Publicação' 
                        value={data_publicacao} 
                        onChange={e => setData_publicacao(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder='URL da Capa' 
                        value={capa_url} 
                        onChange={e => setCapa_url(e.target.value)} 
                    />
                    <label>
                        Disponível: 
                        <input 
                            type="checkbox"  
                            checked={disponivel} 
                            onChange={e => setDisponivel(e.target.checked)} 
                        />
                    </label>
                    <button onClick={cadastrarLivro}>
                        {id === '' ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </div>
            </section>

            <section>
                <h2>Lista de Livros</h2>
                <button onClick={listarLivros}>Listar Livros</button>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Gênero</th>
                            <th>Data Publicação</th>
                            <th>Disponível</th>
                            <th>Capa</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map(item => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.titulo}</td>
                                <td>{item.autor}</td>
                                <td>{item.genero}</td>
                                <td>{item.data_publicacao}</td>
                                <td>{item.disponivel ? "Sim" : "Não"}</td>
                                <td>
                                    {item.capa_url && 
                                        <img src={item.capa_url} alt={item.titulo} style={{width: '50px'}} />
                                    }
                                </td>
                                <td>
                                    <button onClick={() => deletarLivro(item.id)}>Deletar</button>
                                </td>
                                <td>
                                    <button onClick={() => editarLivro(item)}>Editar</button>
                                </td>
                            </tr> 
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
