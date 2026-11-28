import CardPersonagem from "./components/CardPersonagem"
import { useState, useEffect } from "react"
import "./App.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import PaginaPersonagem from "./components/PaginaPersonagem"
import { supabase } from "./lib/supabase"
import FormPersonagem from "./components/FormPersonagem"
import Entrada from "./components/Entrada"

function App() {
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("todos")
  const navegar = useNavigate()
  const [sessao, setSessao] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [personagens, setPersonagens] = useState([])
  const [carregandoPersonagens, setCarregandoPersonagens] = useState(true)
  const [visitante, setVisitante] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessao(data.session)
      setCarregando(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      setSessao(novaSessao)
    })

    return () => data.subscription.unsubscribe()
  }, [])
  
  async function buscarPersonagens() {
    const tabela = sessao ? "personagens" : "personagens_publicas"
    const { data, error } = await supabase.from(tabela).select("*").order("nome")

    if (error) {
      console.error("Erro ao buscar personagens:", error)
    } else {
      setPersonagens(data.map((linha) => ({ ...linha, ...linha.capitulos })))
    }

    setCarregandoPersonagens(false)
  }

  useEffect(() => {
    if (sessao || visitante) {
      buscarPersonagens()
    }
  }, [sessao, visitante])
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
  
  if (carregando || ((sessao || visitante) && carregandoPersonagens)) {
    return <p className="carregando">Abrindo o baú...</p>
  }

  if (!sessao && !visitante) {
    return <Entrada aoVisitar={() => setVisitante(true)} />
  }

  const somenteLeitura = !sessao

  
  return (
        <Routes>
      <Route path="/" element={
    <div className="pagina">
      <header className="cabecalho">
        <h1 className="logo">Baú de Almas</h1>
        <p className="slogan">Seus personagens, suas histórias.</p>
        {somenteLeitura ? (
          <>
            <span className="modo-visitante">Modo visitante</span>
            <button className="sair" onClick={() => setVisitante(false)}>Voltar à entrada</button>
          </>
        ) : (
          <button className="sair" onClick={() => supabase.auth.signOut()}>Sair</button>
        )}
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
      
      {!somenteLeitura && (
        <button className="nova" onClick={() => navegar("/nova")}>+ Nova personagem</button>
      )}


      <div className="galeria">
        {personagensFiltrados.map((personagem) => (
          <CardPersonagem
            key={personagem.nome}
            nome={personagem.nome}
            resumo={personagem.resumo}
            sistema={personagem.sistema}
            foto={personagem.foto}
            aoAbrir={() => navegar("/personagem/" + personagem.id)}          />
      ))}
      </div>
    </div>
          } />

      <Route path="/personagem/:id/:capitulo?" element={<PaginaPersonagem personagens={personagens} aoSalvar={buscarPersonagens} somenteLeitura={somenteLeitura} />} />
      {!somenteLeitura && (
        <>
          <Route path="/nova" element={<FormPersonagem personagens={personagens} aoSalvar={buscarPersonagens} />} />
          <Route path="/editar/:id" element={<FormPersonagem personagens={personagens} aoSalvar={buscarPersonagens} />} />
        </>
      )}
    </Routes>
  )
}

export default App