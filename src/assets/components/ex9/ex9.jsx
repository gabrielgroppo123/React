import { useState } from "react";
import "./ex9.css"
export default function Ex9() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);

  function alteraTarefa(e) {
    setTarefa(e.target.value);
  }

  function adicionar() {
    if (tarefa.trim() === "") return; 
    setTarefas([...tarefas, tarefa]);
    setTarefa("");
  }

  function excluir(index) {
    setTarefas(tarefas.filter((_, i) => i !== index));
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <input type="text" value={tarefa} size={20} onChange={alteraTarefa} placeholder="Descreva a Tarefa" />
      <label> &nbsp; </label>
      <button onClick={adicionar}>Adicionar</button>

      <ul>
        {tarefas.map((t, index) => (
          <li key={index}>
            {t} <button onClick={() => excluir(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}