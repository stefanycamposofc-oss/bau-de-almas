const grupos = [
    { chave: "qualidades", rotulo: "Qualidades"},
    { chave: "defeitos", rotulo: "Defeitos"},
    { chave: "hobbies", rotulo: "Hobbies"},
    { chave: "manias", rotulo: "Manias"},
    { chave: "medos", rotulo: "Medos"},
    { chave: "traumas", rotulo: "Traumas"},
]

function CapituloPersonalidade({personalidade}) {
    return (
        <div className="personalidade">
            {grupos.map((grupo) => {
                const itens = personalidade[grupo.chave] || []

                return (
                    <div className="grupo" key={grupo.rotulo}>
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

            {personalidade.sexualidade && (
                <div className="grupo">
                    <h3 className="grupo-titulo">Sexualidade</h3>
                    <p>{personalidade.sexualidade}</p>
                </div>
            )}
        </div>
    )
}

export default CapituloPersonalidade