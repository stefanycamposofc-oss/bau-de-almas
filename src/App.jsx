import CardPersonagem from "./components/CardPersonagem"
import personagens from "./data/personagens"


function App() {
  return (
    <div>
      <h1>Baú de Almas</h1>
      <p>Seus personagens, suas histórias.</p>

      {personagens.map((personagem) => (
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