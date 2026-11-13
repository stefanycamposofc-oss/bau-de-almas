import CardPersonagem from "./components/CardPersonagem"
import personagens from "./data/personagens"
import { useState } from "react"
import "./App.css"

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
    <div className="pagina">
      <header className="cabecalho">
        <h1 className="logo">Baú de Almas</h1>
        <p className="slogan">Seus personagens, suas histórias.</p>
      </header>
      <input
        className="busca"
        type="text"
        placeholder="Pesquise por Nome..."
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />

      <div className="filtros">
        <button className="filtro" onClick={() => setTipo("todos")}>Todos</button>
        <button className="filtro" onClick={() => setTipo("rpg")}>RPG</button>
        <button className="filtro" onClick={() => setTipo("historia")}>Histórias</button>
        <button className="filtro" onClick={() => setTipo("D&D")}>D&D</button>
        <button className="filtro" onClick={() => setTipo("Ordem Paranormal")}>Ordem Paranormal</button>
      </div>


      <div className="galeria">
        {personagensFiltrados.map((personagem) => (
          <CardPersonagem
            key={personagem.nome}
            nome={personagem.nome}
            resumo={personagem.resumo}
            sistema={personagem.sistema}
            foto={personagem.foto}

          />
      ))}
      </div>
    </div>
  )
}

export default App