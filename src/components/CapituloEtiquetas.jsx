function CapituloEtiquetas ({ grupos, dados}) {
    return (
        <div className="grupos-etiquetas">
            {grupos.map((grupo) => {
                const itens = dados[grupo.chave] || []

                return (
                    <div className="grupo" key={grupo.chave}>
                        <h3 className="grupo-titulo">{grupo.rotulo}</h3>
                        {itens.length > 0 ? (
                            <ul className="etiquetas">
                                {itens.map((item) => (
                                    <li className="etiqueta" key={item}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="em-breve">Nada anotado.</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default CapituloEtiquetas