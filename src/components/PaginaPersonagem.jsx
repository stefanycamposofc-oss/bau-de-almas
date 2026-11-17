import "./PaginaPersonagem.css"

function PaginaPersonagem({ personagem, aoVoltar}) {
    return (
        <div className= "pagina-personagem">
            <button className= "voltar" onClick={aoVoltar}>← Voltar ao baú</button>

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