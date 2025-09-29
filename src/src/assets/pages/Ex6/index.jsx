import axios from 'axios'
import { useState } from 'react'
import './index.css'

export default function Ex6() {
    const [receitas, setReceitas] = useState([]);
    const [filtroVegetariana, setFiltroVegetariana] = useState('');

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [instrucoes, setInstrucoes] = useState('');
    const [tempoPreparo, setTempoPreparo] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');
    const [vegetariana, setVegetariana] = useState(false);
    const [fotoUrl, setFotoUrl] = useState('');

    async function editarReceita(receita) {
        setNome(receita.nome);
        setIngredientes(receita.ingredientes);
        setInstrucoes(receita.instrucoes);
        setTempoPreparo(receita.tempo_preparo_minutos);
        setDataCriacao(receita.data_criacao);
        setVegetariana(receita.vegetariana);
        setFotoUrl(receita.foto_url);
        setId(receita.id);
    }

    async function deletarReceita(id) {
        let URL = 'http://localhost:5010/receitas/' + id;
        await axios.delete(URL);

        alert('Receita ' + id + ' deletada com sucesso!');
        listarReceitas();
    }

    async function cadastrarReceita() {
        let novaReceita = {
            nome,
            ingredientes,
            instrucoes,
            tempo_preparo_minutos: Number(tempoPreparo),
            data_criacao: dataCriacao,
            vegetariana,
            foto_url: fotoUrl
        };
        
        if (id === '') {
            let URL = 'http://localhost:5010/receitas';
            let resp = await axios.post(URL, novaReceita);
            alert('Receita criada com ID: ' + resp.data.id);
        }
        else {
            let URL = 'http://localhost:5010/receitas/' + id;
            await axios.put(URL, novaReceita);
            alert('Receita ' + id + ' atualizada com sucesso!');
        }

        limparCampos();
        listarReceitas();
    }

    function limparCampos() {
        setNome('');
        setIngredientes('');
        setInstrucoes('');
        setTempoPreparo('');
        setDataCriacao('');
        setVegetariana(false);
        setFotoUrl('');
        setId('');
    }

    async function listarReceitas() {
        let URL = 'http://localhost:5010/receitas';
        let resp = await axios.get(URL);
        setReceitas(resp.data);
    }

    const receitasFiltradas = receitas.filter(r =>
        filtroVegetariana === '' ? true : 
        filtroVegetariana === 'sim' ? r.vegetariana === true : r.vegetariana === false
    );

    return (
        <div className='pagina-usuario'>
            <h1>API - Receitas</h1>

            <section>
                <h2>Cadastro</h2>
                <div className='cadastro'>
                    <input 
                        type="text" 
                        placeholder='Nome' 
                        value={nome} 
                        onChange={e => setNome(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder='Ingredientes' 
                        value={ingredientes} 
                        onChange={e => setIngredientes(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder='Instruções' 
                        value={instrucoes} 
                        onChange={e => setInstrucoes(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder='Tempo de Preparo (min)' 
                        value={tempoPreparo} 
                        onChange={e => setTempoPreparo(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        value={dataCriacao} 
                        onChange={e => setDataCriacao(e.target.value)} 
                    />
                    <label>
                        Vegetariana:
                        <input 
                            type="checkbox" 
                            checked={vegetariana} 
                            onChange={e => setVegetariana(e.target.checked)} 
                        />
                    </label>
                    <input 
                        type="text" 
                        placeholder='Foto URL' 
                        value={fotoUrl} 
                        onChange={e => setFotoUrl(e.target.value)} 
                    />
                    <button onClick={cadastrarReceita}>
                        {id === '' ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </div>
            </section>

            <section>
                <h2>Lista de Receitas</h2>
                <button onClick={listarReceitas}>Listar Receitas</button>

                <label style={{marginLeft: '15px'}}>
                    Filtrar por Tipo:
                    <select 
                        value={filtroVegetariana} 
                        onChange={e => setFiltroVegetariana(e.target.value)}
                        style={{marginLeft: '5px'}}
                    >
                        <option value="">Todas</option>
                        <option value="sim">Vegetarianas</option>
                        <option value="nao">Não Vegetarianas</option>
                    </select>
                </label>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Ingredientes</th>
                            <th>Tempo Preparo</th>
                            <th>Data Criação</th>
                            <th>Vegetariana</th>
                            <th>Foto</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {receitasFiltradas.map(item => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.ingredientes}</td>
                                <td>{item.tempo_preparo_minutos} min</td>
                                <td>{item.data_criacao}</td>
                                <td>{item.vegetariana ? 'Sim' : 'Não'}</td>
                                <td>
                                    {item.foto_url && (
                                        <img src={item.foto_url} alt={item.nome} width="60" />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deletarReceita(item.id)}>Deletar</button>
                                </td>
                                <td>
                                    <button onClick={() => editarReceita(item)}>Editar</button>
                                </td>
                            </tr> 
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
