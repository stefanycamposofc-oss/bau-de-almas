import "./PaginaPersonagem.css"
import { useParams, useNavigate, Link } from "react-router-dom"
import CapituloBasico from "./CapituloBasico"
import CapituloTexto from "./CapituloTexto"
import CapituloPersonalidade from "./CapituloPersonalidade"
import CapituloEtiquetas from "./CapituloEtiquetas"
import CapituloRelacoes from "./CapituloRelacoes"
import CapituloItens from "./CapituloItens"
import CapituloGaleria from "./CapituloGaleria"
import FichaDnd from "./FichaDnd"
import FichaOrdem from "./FichaOrdem"

const capitulos = [
    { id: "basico", titulo: "Informações básicas"},
    { id: "aparencia", titulo: "Aparência"},
    { id: "vestuario", titulo: "Vestuário"},
    { id: "armas", titulo: "Armas"},
    { id: "personalidade", titulo: "Personalidade"},
    { id: "gostos", titulo: "Gostos"},
    { id: "historia", titulo: "História"},
    { id: "objetivos", titulo: "Objetivos e segredos"},
    { id: "relacoes", titulo: "Relações"},
    { id: "galeria", titulo: "Galeria"},
    { id: "ficha", titulo: "Ficha"},
    { id: "anotacoes", titulo: "Anotações"},
]
const gruposGostos = [
    {chave: "comidas", rotulo: "Comidas" },
    {chave: "bebidas", rotulo: "Bebidas" },
    {chave: "musicas", rotulo: "Músicas" },
    {chave: "cores", rotulo: "Cores" },
    {chave: "lugares", rotulo: "Lugares" },
    {chave: "outros", rotulo: "Outros" },
]

function PaginaPersonagem({ personagens }) {
        const { id, capitulo } = useParams()
    const navegar = useNavigate()
    const personagem = personagens.find((item) => item.id === id)

    if (!personagem) {
        return <p>Personagem não encontrada.</p>
    }
    const ehHistoria = personagem.sistema === "Personagem de história"
    const capitulosVisiveis = capitulos.filter((cap) => !(ehHistoria && cap.id ==="ficha"))
    const capituloAtual = capitulosVisiveis.find((cap) => cap.id === capitulo) || capitulosVisiveis[0]
    const dados = personagem[capituloAtual.id]
    const capitulosDeTexto = ["aparencia", "historia", "objetivos", "anotacoes"]

    let conteudo = <p className="em-breve">Este capítulo ainda está em branco.</p>

    if (capituloAtual.id === "basico" && dados){
        conteudo = <CapituloBasico basico={dados}/>
    } else if (capitulosDeTexto.includes(capituloAtual.id) && dados) {
        conteudo = <CapituloTexto texto={dados}/>
    } else if (capituloAtual.id === "personalidade" && dados) {
        conteudo = <CapituloPersonalidade personalidade={dados} />
    } else if (capituloAtual.id === "gostos" && dados) {
        conteudo = <CapituloEtiquetas grupos={gruposGostos} dados={dados}/>
    } else if (capituloAtual.id === "relacoes" && dados) {
        conteudo = <CapituloRelacoes relacoes={dados} />
    } else if (["vestuario", "armas"].includes(capituloAtual.id) && dados) {
        conteudo = <CapituloItens itens={dados} />
    } else if (capituloAtual.id === "galeria" && dados) {
        conteudo = <CapituloGaleria imagens={dados} />
    } else if (capituloAtual.id === "ficha" && dados) {
        if (personagem.sistema === "D&D"){
            conteudo = <FichaDnd ficha={dados} />
        } else if (personagem.sistema ==="Ordem Paranormal") {
            conteudo = <FichaOrdem ficha={dados} />
        }
    }

    return (
        <div className= "pagina-personagem">
            <button className= "voltar" onClick={() => navegar("/")}>← Voltar ao baú</button>

            <div className="perfil">
                {personagem.foto && (
                    <img className="perfil-foto" src={personagem.foto} alt={personagem.nome} />
                )}
                <div>
                    <span className="perfil-sistema">{personagem.sistema}</span>
                    <h1 className="perfil-nome">{personagem.nome}</h1>
                    <p className="perfil-resumo">{personagem.resumo}</p>
                    <button className="editar" onClick={() => navegar("/editar/" + personagem.id)}>Editar</button>
                </div>
        </div>
        <div className="capitulos">
            <nav className="menu-capitulos">
                {capitulosVisiveis.map((cap) => (
                    <Link
                        replace
                        key={cap.id}
                        to={"/personagem/" + personagem.id + "/" + cap.id}
                        className={cap.id === capituloAtual.id ? "link-capitulo ativo" : "link-capitulo"}>
                            {cap.titulo}
                        </Link>
                ))}    
            </nav>

            <section className="conteudo-capitulo">
                <h2>{capituloAtual.titulo}</h2>
                {conteudo}
            </section>
        </div>
    </div>
    )
}

export default PaginaPersonagem