import axios from 'axios'
import { useState } from 'react'
import './index.css'


export default function Ex1() {
    const [usuarios, setUsuarios] = useState([]);

    const [id, setId] = useState('');
    const [nome_completo, setNome_completo] = useState('');
    const [email, setEmail] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [ativo, setAtivo] = useState(false);


    async function editarUsuario(usuario) {
        setNome_completo(usuario.nome_completo);
        setEmail(usuario.email);
        setData_nascimento(usuario.data_nascimento);
        setId(usuario.id);
        setAtivo(usuario.ativo);
    }

    async function deletarUsuario(id) {
        let URL = 'http://localhost:5010/usuarios/' + id;
        await axios.delete(URL);

        alert('Usuario ' + id + ' deletado com sucesso!');
        listarFilmes();
    }

    async function cadastrarUsuario() {
        let novoUsuario = {
            nome_completo: nome_completo,
            email: email,
            data_nascimento: data_nascimento,
            ativo: ativo
        };
        
        if (id == '') {
            let URL = 'http://localhost:5010/usuarios'
            let resp = await axios.post(URL, novoUsuario);
            alert('Usuario' + id + ' criado com sucesso');
        }
        else {
            let URL = 'http://localhost:5010/usuarios/' + id;
            await axios.put(URL, novoUsuario);
            alert('Usuario ' + id + ' atualizado com sucesso!');
        }

        limparCampos();
        listarUsuarios();
    }

    function limparCampos() {
        setNome_completo('');
        setData_nascimento('');
        setEmail('');
        setAtivo('');
    }

    async function listarUsuarios() {
        let URL = 'http://localhost:5010/usuarios'
        let resp = await axios.get(URL);

        setUsuarios(resp.data);
    }

    return (
        <div className='pagina-usuario'>
            <h1>API - Usuario</h1>

            <section>
                <h1> Cadastro </h1>
                <div className='cadastro'>
                    <input type="text" placeholder='Nome do Usuario' value={nome_completo} onChange={e => setNome_completo(e.target.value)} />
                    <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" placeholder='Data Nascimento' value={data_nascimento} onChange={e => setData_nascimento(e.target.value)} />
                    <label>Ativo: <input type="checkbox"  checked={ativo} onChange={e=> setAtivo(e.target.checked )}></input></label>
                    <button onClick={cadastrarUsuario}>
                        {id == '' ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </div>
            </section>

            
            <section>
                <h1> Lista de Usuarios </h1>
                <button onClick={listarUsuarios}> Listar Usuarios </button>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome completo</th>
                            <th>Email</th>
                            <th>Data de Nascimento</th>
                            <th>Ativo</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(item => 
                            <tr>
                                <td> {item.id} </td>
                                <td> {item.nome_completo} </td>
                                <td> {item.email} </td>
                                <td> {item.data_nascimento} </td>
                                <td> {item.ativo ? "Sim" : "Não"}</td>
                                <td> <button onClick={() => deletarUsuario(item.id)}>Deletar</button></td>
                                <td> <button onClick={() => editarUsuario(item)}>Editar</button></td>
                            </tr> 
                        )}
                    </tbody>
                </table>

            </section>
            
            
        </div>
    )

}