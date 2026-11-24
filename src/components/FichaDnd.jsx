export const atributosDnd = [
    { chave: "forca", sigla: "FOR"},
    { chave: "destreza", sigla: "DES"},
    { chave: "constituicao", sigla: "CON"},
    { chave: "inteligencia", sigla: "INT"},
    { chave: "sabedoria", sigla: "SAB"},
    { chave: "carisma", sigla: "CAR"},
]

function calcularModificador(valor) {
    return Math.floor((valor - 10) / 2)
}

function formatarModificador(modificador) {
    return modificador >= 0 ? "+" + modificador : String(modificador)
}

function FichaDnd({ ficha }) {
    const resumo = [
        { rotulo: "Nível", valor: ficha.nivel },
        { rotulo: "CA", valor: ficha.ca },
        { rotulo: "Vida", valor: ficha.vida },
    ]

    return (
        <div className="ficha-rpg">
            <div className="ficha-resumo">
                {resumo.map((item) => (
                    <div className="ficha-stat" key={item.rotulo}>
                        <span className="ficha-stat-rotulo">{item.rotulo}</span>
                        <span className="ficha-stat-valor">{item.valor}</span>
                    </div>
                ))}
            </div>

            <div className="atributos">
                {atributosDnd.map((atributo) => {
                    const valor = ficha.atributos[atributo.chave]
                    const modificador = calcularModificador(valor)

                    return (
                        <div className="atributo" key={atributo.chave}>
                            <span className="atributo-sigla">{atributo.sigla}</span>
                            <span className="atributo-principal">{formatarModificador(modificador)}</span>
                            <span className="atributo-valor">{valor}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FichaDnd