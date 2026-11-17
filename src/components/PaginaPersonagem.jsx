import "./PaginaPersonagem.css"
import { useParams, useNavigate } from "react-router-dom"
import personagens from "../data/personagens"

function PaginaPersonagem() {
        const { id } = useParams()
    const navegar = useNavigate()
    const personagem = personagens.find((item) => item.id === id)

    if (!personagem) {
        return <p>Personagem não encontrada.</p>
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
                </div>
        </div>
    </div>
    )
}

export default PaginaPersonagem