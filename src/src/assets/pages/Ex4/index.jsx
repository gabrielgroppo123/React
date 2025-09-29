import axios from 'axios'
import { useState } from 'react'
import './index.css'

export default function Ex4() {
    const [produtos, setProdutos] = useState([]);
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [data_criacao, setData_criacao] = useState('');
    const [disponivel, setDisponivel] = useState(false);

    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    async function editarProduto(produto) {
        setId(produto.id);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setData_criacao(produto.data_criacao);
        setDisponivel(produto.disponivel);
    }

    async function deletarProduto(id) {
        let URL = 'http://localhost:5010/produtos/' + id;
        await axios.delete(URL);
        alert('Produto ' + id + ' deletado com sucesso!');
        listarProdutos();
    }

    async function cadastrarProduto() {
        let novoProduto = {
            nome,
            descricao,
            preco: Number(preco),
            data_criacao,
            disponivel
        };

        if (id === '') {
            let URL = 'http://localhost:5010/produtos';
            let resp = await axios.post(URL, novoProduto);
            alert('Produto criado com ID: ' + resp.data.id);
        } else {
            let URL = 'http://localhost:5010/produtos/' + id;
            await axios.put(URL, novoProduto);
            alert('Produto ' + id + ' atualizado com sucesso!');
        }

        limparCampos();
        listarProdutos();
    }

    function limparCampos() {
        setId('');
        setNome('');
        setDescricao('');
        setPreco('');
        setData_criacao('');
        setDisponivel(false);
    }

    async function listarProdutos() {
        let URL = 'http://localhost:5010/produtos';
        let resp = await axios.get(URL);
        setProdutos(resp.data);
    }

    // filtro por intervalo de datas
    const produtosFiltrados = produtos.filter((p) => {
        const data = new Date(p.data_criacao);
        const inicio = dataInicial ? new Date(dataInicial) : null;
        const fim = dataFinal ? new Date(dataFinal) : null;

        if (inicio && data < inicio) return false;
        if (fim && data > fim) return false;
        return true;
    });

    return (
        <div className='pagina-usuario'>
            <h1>API - Produtos</h1>

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
                        placeholder='Descrição' 
                        value={descricao} 
                        onChange={e => setDescricao(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder='Preço' 
                        value={preco} 
                        onChange={e => setPreco(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        placeholder='Data Criação' 
                        value={data_criacao} 
                        onChange={e => setData_criacao(e.target.value)} 
                    />
                    <label>
                        Disponível: 
                        <input 
                            type="checkbox" 
                            checked={disponivel} 
                            onChange={e => setDisponivel(e.target.checked)} 
                        />
                    </label>
                    <button onClick={cadastrarProduto}>
                        {id === '' ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </div>
            </section>

            <section>
                <h2>Lista de Produtos</h2>
                <button onClick={listarProdutos}>Listar Produtos</button>

                <div style={{margin: '10px 0'}}>
                    <label>Data Inicial: </label>
                    <input 
                        type="date" 
                        value={dataInicial} 
                        onChange={e => setDataInicial(e.target.value)} 
                    />
                    <label style={{marginLeft: '10px'}}>Data Final: </label>
                    <input 
                        type="date" 
                        value={dataFinal} 
                        onChange={e => setDataFinal(e.target.value)} 
                    />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Data Criação</th>
                            <th>Disponível</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosFiltrados.map(item => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td>R$ {item.preco}</td>
                                <td>{item.data_criacao}</td>
                                <td>{item.disponivel ? "Sim" : "Não"}</td>
                                <td>
                                    <button onClick={() => deletarProduto(item.id)}>Deletar</button>
                                </td>
                                <td>
                                    <button onClick={() => editarProduto(item)}>Editar</button>
                                </td>
                            </tr> 
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
