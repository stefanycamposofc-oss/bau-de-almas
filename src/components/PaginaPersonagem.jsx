import "./PaginaPersonagem.css"
import { useParams, useNavigate, Link } from "react-router-dom"
import personagens from "../data/personagens"
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
const camposBasicos = [
    { chave: "idade", rotulo: "Idade"},
    { chave: "genero", rotulo: "Gênero"},
    { chave: "raca", rotulo: "Raça"},
    { chave: "classe", rotulo: "Classe"},
    { chave: "origem", rotulo: "Origem"},
]

function PaginaPersonagem() {
        const { id, capitulo } = useParams()
    const navegar = useNavigate()
    const personagem = personagens.find((item) => item.id === id)

    if (!personagem) {
        return <p>Personagem não encontrada.</p>
    }
    const ehHistoria = personagem.sistema === "Personagem de história"
    const capitulosVisiveis = capitulos.filter((cap) => !(ehHistoria && cap.id ==="ficha"))
    const capituloAtual = capitulosVisiveis.find((cap) => cap.id === capitulo) || capitulosVisiveis[0]
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
                </div>
        </div>
        <div className="capitulos">
            <nav className="menu-capitulos">
                {capitulosVisiveis.map((cap) => (
                    <Link
                        key={cap.id}
                        to={"/personagem/" + personagem.id + "/" + cap.id}
                        className={cap.id === capituloAtual.id ? "link-capitulo ativo" : "link-capitulo"}>
                            {cap.titulo}
                        </Link>
                ))}    
            </nav>

            <section className="conteudo-capitulo">
                <h2>{capituloAtual.titulo}</h2>
                {capituloAtual.id === "basico" && personagem.basico ? (
                    <dl className="dados">
                        {camposBasico.map((campo) => (
                            <div className="dado" key={campo.chave}>
                                <dt>{campo.rotulo}</dt>
                                <dd>{personagem.basico[campo.chave] || "—"}</dd>
                            </div>
                        ))}
                    </dl>    
                ) : (
                    <p className="em-breve">Este capítulo ainda está em branco.</p>
                )}    
            </section>
        </div>
    </div>
    )
}

export default PaginaPersonagem