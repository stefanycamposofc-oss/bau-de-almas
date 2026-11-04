import CardPersonagem from "./components/CardPersonagem"
import personagens from "./data/personagens"
import { useState } from "react"

function App() {
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("todos")
  const personagensFiltrados = personagens.filter((personagem) => {
    const combinaBusca = personagem.nome.toLowerCase().includes(busca.toLowerCase())

    const ehHistoria = personagem.sistema === "Personagem de história"

    const combinaTipo = 
      tipo === "todos" ||
      (tipo === "rpg" && ! ehHistoria) ||
      (tipo === "historia" && ehHistoria) ||
      personagem.sistema === tipo

    return combinaBusca && combinaTipo
  })
    

  return (
    <div>
      <h1>Baú de Almas</h1>
      <p>Seus personagens, suas histórias.</p>
      <input
        type="text"
        placeholder="Pesquise por Nome..."
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />

      <div>
        <button onClick={() => setTipo("todos")}>Todos</button>
        <button onClick={() => setTipo("rpg")}>RPG</button>
        <button onClick={() => setTipo("historia")}>Histórias</button>
        <button onClick={() => setTipo("D&D")}>D&D</button>
        <button onClick={() => setTipo("Ordem Paranormal")}>Ordem Paranormal</button>
      </div>


      {personagensFiltrados.map((personagem) => (
        <CardPersonagem
          key={personagem.nome}
          nome={personagem.nome}
          resumo={personagem.resumo}
          sistema={personagem.sistema}
        />
      ))}
    </div>
  )
}

export default App