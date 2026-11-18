function CapituloTexto({ texto }) {
    const paragrafos = texto.split("\n\n")

    return (
        <div className="texto-capitulo">
            {paragrafos.map((paragrafo, indice) => (
                <p key={indice}>{paragrafo}</p>
            ))}
        </div>
    )
}

export default CapituloTexto