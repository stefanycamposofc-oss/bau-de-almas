function CardPersonagem({ nome, resumo,sistema }) {
    return(
        <div>
            <h2>{nome}</h2>
            <p>{resumo}</p>
            <span>{sistema}</span>
        </div>
    )
}

export default CardPersonagem