export const atributosDnd = [
    { chave: "forca", sigla: "FOR"},
    { chave: "destreza", sigla: "DES"},
    { chave: "constituicao", sigla: "CON"},
    { chave: "inteligencia", sigla: "INT"},
    { chave: "sabedoria", sigla: "SAB"},
    { chave: "carisma", sigla: "CAR"},
]

export const periciasDnd = [
    { chave: "acrobacia", nome: "Acrobacia", atributo: "destreza" },
    { chave: "adestrar", nome: "Adestrar Animais", atributo: "sabedoria" },
    { chave: "arcanismo", nome: "Arcanismo", atributo: "inteligencia" },
    { chave: "atletismo", nome: "Atletismo", atributo: "forca" },
    { chave: "atuacao", nome: "Atuação", atributo: "carisma" },
    { chave: "enganacao", nome: "Enganação", atributo: "carisma" },
    { chave: "furtividade", nome: "Furtividade", atributo: "destreza" },
    { chave: "historia", nome: "História", atributo: "inteligencia" },
    { chave: "intimidacao", nome: "Intimidação", atributo: "carisma" },
    { chave: "intuicao", nome: "Intuição", atributo: "sabedoria" },
    { chave: "investigacao", nome: "Investigação", atributo: "inteligencia" },
    { chave: "medicina", nome: "Medicina", atributo: "sabedoria" },
    { chave: "natureza", nome: "Natureza", atributo: "inteligencia" },
    { chave: "percepcao", nome: "Percepção", atributo: "sabedoria" },
    { chave: "persuasao", nome: "Persuasão", atributo: "carisma" },
    { chave: "prestidigitacao", nome: "Prestidigitação", atributo: "destreza" },
    { chave: "religiao", nome: "Religião", atributo: "inteligencia" },
    { chave: "sobrevivencia", nome: "Sobrevivência", atributo: "sabedoria" },
]

export const grausDnd = ["Sem proficiência", "Proficiente", "Especialista"]

const marcas = ["○", "●", "◆"]

function calcularModificador(valor) {
    return Math.floor((valor - 10) / 2)
}

function formatarModificador(modificador) {
    return modificador >= 0 ? "+" + modificador : String(modificador)
}

function calcularProficiencia(nivel) {
    return Math.floor((nivel - 1) / 4) + 2
}

function FichaDnd({ ficha }) {
    const proficiencia = calcularProficiencia(ficha.nivel || 1)
    const pericias = ficha.pericias || {}

    const resumo = [
        { rotulo: "Nível", valor: ficha.nivel },
        { rotulo: "CA", valor: ficha.ca },
        { rotulo: "Vida", valor: ficha.vida },
        { rotulo: "Proficiência", valor: formatarModificador(proficiencia) },
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

            <h3 className="ficha-secao">Perícias</h3>
            <ul className="pericias">
                {periciasDnd.map((pericia) => {
                    const grau = pericias[pericia.chave] || 0
                    const modificador = calcularModificador(ficha.atributos[pericia.atributo])
                    const bonus = modificador + grau * proficiencia
                    const sigla = atributosDnd.find((atributo) => atributo.chave === pericia.atributo).sigla

                    return (
                        <li className={grau > 0 ? "pericia treinada" : "pericia"} key={pericia.chave}>
                            <span className="pericia-marca" title={grausDnd[grau]}>{marcas[grau]}</span>
                            <span className="pericia-nome">{pericia.nome}</span>
                            <span className="pericia-atributo">{sigla}</span>
                            <span className="pericia-bonus">{formatarModificador(bonus)}</span>
                        </li>
                    )
                })}
            </ul>
            <p className="ficha-legenda">○ sem proficiência · ● proficiente · ◆ especialista</p>
        </div>
    )
}

export default FichaDnd