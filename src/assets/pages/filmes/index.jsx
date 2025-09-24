import axios from 'axios'
import { useState } from 'react'
import './index.css'

export default function Filmes() {
    const [filmes, setFilmes] = useState([]);

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');


    async function editarFilme(filme) {
        setNome(filme.titulo);
        setGenero(filme.genero);
        setAno(filme.ano);
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
            titulo: nome,
            genero: genero,
            ano: ano
        };
        
        if (id == '') {
            let URL = 'http://localhost:5010/filmes'
            let resp = await axios.post(URL, novoFilme);
            alert('Novo id: ' + resp.data.id);
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
        setNome('');
        setGenero('');
        setAno('');
    }

    async function listarFilmes() {
        let URL = 'http://localhost:5010/filmes'
        let resp = await axios.get(URL);

        setFilmes(resp.data);
    }

    return (
        <div className='pagina-filmes'>
            <h1>API - FILMES</h1>

            <section>
                <h1> Cadastro </h1>
                <div className='cadastro'>
                    <input type="text" placeholder='Nome do Filme' value={nome} onChange={e => setNome(e.target.value)} />
                    <input type="text" placeholder='Gênero' value={genero} onChange={e => setGenero(e.target.value)} />
                    <input type="text" placeholder='Ano de Lançamento' value={ano} onChange={e => setAno(e.target.value)} />
                    <button onClick={cadastrarFilme}>
                        {id == '' ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </div>
            </section>

            
            <section>
                <h1> Lista de Filmes </h1>
                <button onClick={listarFilmes}> Listar Filmes </button>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Gênero</th>
                            <th>Ano</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filmes.map(item => 
                            <tr>
                                <td> {item.id} </td>
                                <td> {item.titulo} </td>
                                <td> {item.genero} </td>
                                <td> {item.ano} </td>
                                <td> <button onClick={() => deletarFilme(item.id)}>Deletar</button></td>
                                <td> <button onClick={() => editarFilme(item)}>Editar</button></td>
                            </tr> 
                        )}
                    </tbody>
                </table>

            </section>
            
            
        </div>
    )

}