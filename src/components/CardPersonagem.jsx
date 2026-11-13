import"./CardPersonagem.css"

function CardPersonagem({ nome, resumo,sistema }) {
    return(
        <div className="ficha">
            <span className="ficha-titulo">REGISTRO DE ALMA</span>
            <p className="campo"><span className="rotulo">Nome:</span> {nome}</p>
            <p className="campo"><span className="rotulo">Descrição:</span> {resumo}</p>
            <p className="campo"><span className="rotulo">Sistema:</span> {sistema}</p>
        </div>
    )
}

export default CardPersonagem