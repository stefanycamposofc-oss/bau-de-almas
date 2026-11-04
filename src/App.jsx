import CardPersonagem from "./components/CardPersonagem"

const personagens = [
  { nome: "Azira", resumo: "Tiefling | Ladina", sistema: "D&D" },
  { nome: "Akantha Liadon", resumo: "Tiefling | Feiticeira", sistema: "D&D" },
  { nome: "Victória Viessi", resumo: "Tiefling | Ladina", sistema: "D&D" },
]

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