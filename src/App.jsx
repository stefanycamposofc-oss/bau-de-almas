import CardPersonagem from "./components/CardPersonagem"
import personagens from "./data/personagens"
import { useState } from "react"

function App() {
  const [busca, setBusca] = useState("")
  const personagensFiltrados = personagens.filter((personagem) =>
    personagem.nome.toLowerCase() .includes(busca.toLowerCase())
  )

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