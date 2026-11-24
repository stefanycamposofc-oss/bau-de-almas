export const atributosOrdem =  [
    { chave: "agilidade", sigla: "AGI" },
    { chave: "forca", sigla: "FOR" },
    { chave: "intelecto", sigla: "INT" },
    { chave: "presenca", sigla: "PRE" },
    { chave: "vigor", sigla: "VIG" },
]

function FichaOrdem({ ficha}) {
    const resumo = [
        { rotulo: "NEX", valor: ficha.nex + "%" },
        { rotulo: "PV", valor: ficha.pv },
        { rotulo: "PE", valor: ficha.pe },
        { rotulo: "Sanidade", valor:ficha.sanidade },
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
                {atributosOrdem.map((atributo) => (
                    <div className="atributo" key={atributo.chave}>
                        <span className="atributo-sigla">{atributo.sigla}</span>
                        <span className="atributo-principal">{ficha.atributos[atributo.chave]}</span>                    </div>
                ))}
            </div>
        </div>
    )
}

export default FichaOrdem