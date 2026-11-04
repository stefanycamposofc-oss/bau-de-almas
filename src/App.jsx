import CardPersonagem from "./components/CardPersonagem"

function App() {
  return (
    <div>
      <h1>Baú de Almas</h1>
      <p>Seus personagens, suas histórias.</p>

      <CardPersonagem nome="Azira" resumo="Tiefling | Ladina" sistema="D&D" />
      <CardPersonagem nome="Akantha Liadon" resumo="Tiefling | Feiticeira" sistema="D&D" />
      <CardPersonagem nome="Victória Viessi" resumo="Tiefling | Ladina" sistema="D&D" />
    </div>
  )
}

export default App