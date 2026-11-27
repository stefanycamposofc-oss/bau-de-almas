export const atributosOrdem = [
    { chave: "agilidade", sigla: "AGI" },
    { chave: "forca", sigla: "FOR" },
    { chave: "intelecto", sigla: "INT" },
    { chave: "presenca", sigla: "PRE" },
    { chave: "vigor", sigla: "VIG" },
]

export const periciasOrdem = [
    { chave: "acrobacia", nome: "Acrobacia", atributo: "agilidade" },
    { chave: "adestramento", nome: "Adestramento", atributo: "presenca" },
    { chave: "artes", nome: "Artes", atributo: "presenca" },
    { chave: "atletismo", nome: "Atletismo", atributo: "forca" },
    { chave: "atualidades", nome: "Atualidades", atributo: "intelecto" },
    { chave: "ciencias", nome: "Ciências", atributo: "intelecto" },
    { chave: "crime", nome: "Crime", atributo: "agilidade" },
    { chave: "diplomacia", nome: "Diplomacia", atributo: "presenca" },
    { chave: "enganacao", nome: "Enganação", atributo: "presenca" },
    { chave: "fortitude", nome: "Fortitude", atributo: "vigor" },
    { chave: "furtividade", nome: "Furtividade", atributo: "agilidade" },
    { chave: "iniciativa", nome: "Iniciativa", atributo: "agilidade" },
    { chave: "intimidacao", nome: "Intimidação", atributo: "presenca" },
    { chave: "intuicao", nome: "Intuição", atributo: "presenca" },
    { chave: "investigacao", nome: "Investigação", atributo: "intelecto" },
    { chave: "luta", nome: "Luta", atributo: "forca" },
    { chave: "medicina", nome: "Medicina", atributo: "intelecto" },
    { chave: "ocultismo", nome: "Ocultismo", atributo: "intelecto" },
    { chave: "percepcao", nome: "Percepção", atributo: "presenca" },
    { chave: "pilotagem", nome: "Pilotagem", atributo: "agilidade" },
    { chave: "pontaria", nome: "Pontaria", atributo: "agilidade" },
    { chave: "profissao", nome: "Profissão", atributo: "intelecto" },
    { chave: "reflexos", nome: "Reflexos", atributo: "agilidade" },
    { chave: "religiao", nome: "Religião", atributo: "presenca" },
    { chave: "sobrevivencia", nome: "Sobrevivência", atributo: "intelecto" },
    { chave: "tatica", nome: "Tática", atributo: "intelecto" },
    { chave: "tecnologia", nome: "Tecnologia", atributo: "intelecto" },
    { chave: "vontade", nome: "Vontade", atributo: "presenca" },
]

export const grausOrdem = ["Destreinado", "Treinado (+5)", "Veterano (+10)", "Expert (+15)"]

const marcas = ["○", "●", "◆", "★"]

function FichaOrdem({ ficha }) {
    const pericias = ficha.pericias || {}

    const identidade = [
        { rotulo: "Classe", valor: ficha.classe },
        { rotulo: "Trilha", valor: ficha.trilha },
        { rotulo: "Origem", valor: ficha.origem },
    ].filter((item) => item.valor)

    const resumo = [
        { rotulo: "NEX", valor: ficha.nex + "%" },
        { rotulo: "PV", valor: ficha.pv },
        { rotulo: "PE", valor: ficha.pe },
        { rotulo: "Sanidade", valor: ficha.sanidade },
    ]

    return (
        <div className="ficha-rpg">
            {identidade.length > 0 && (
                <dl className="ficha-identidade">
                    {identidade.map((item) => (
                        <div key={item.rotulo}>
                            <dt>{item.rotulo}</dt>
                            <dd>{item.valor}</dd>
                        </div>
                    ))}
                </dl>
            )}
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
                        <span className="atributo-principal">{ficha.atributos[atributo.chave]}</span>
                    </div>
                ))}
            </div>

            <h3 className="ficha-secao">Perícias</h3>
            <ul className="pericias">
                {periciasOrdem.map((pericia) => {
                    const grau = pericias[pericia.chave] || 0
                    const dados = ficha.atributos[pericia.atributo] || 0
                    const sigla = atributosOrdem.find((atributo) => atributo.chave === pericia.atributo).sigla

                    return (
                        <li className={grau > 0 ? "pericia treinada" : "pericia"} key={pericia.chave}>
                            <span className="pericia-marca" title={grausOrdem[grau]}>{marcas[grau]}</span>
                            <span className="pericia-nome">{pericia.nome}</span>
                            <span className="pericia-atributo">{sigla}</span>
                            <span className="pericia-bonus">
                                {dados > 0 ? dados + "d20" : "2d20↓"} +{grau * 5}
                            </span>
                        </li>
                    )
                })}
            </ul>
            <p className="ficha-legenda">○ destreinado · ● treinado · ◆ veterano · ★ expert · 2d20↓ = rola 2 e fica com o menor</p>
        </div>
    )
}

export default FichaOrdem