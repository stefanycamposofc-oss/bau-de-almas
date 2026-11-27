import { useState } from "react"

function EditorFicha({ campos, atributos, pericias, graus, valorInicial, aoSalvar, aoCancelar }) {
    const inicial = valorInicial || {}
    const [valores, setValores] = useState(inicial)
    const [valoresAtributos, setValoresAtributos] = useState(inicial.atributos || {})
    const [valoresPericias, setValoresPericias] = useState(inicial.pericias || {})
    const [salvando, setSalvando] = useState(false)

    async function salvar() {
        setSalvando(true)

        const fichaNova = { ...inicial, atributos: {}, pericias: valoresPericias }

        campos.forEach((campo) => {
            fichaNova[campo.chave] = Number(valores[campo.chave]) || 0
        })

        atributos.forEach((atributo) => {
            fichaNova.atributos[atributo.chave] = Number(valoresAtributos[atributo.chave]) || 0
        })

        await aoSalvar(fichaNova)
        setSalvando(false)
    }

    return (
        <div className="editor">
            <div className="editor-numeros">
                {campos.map((campo) => (
                    <label className="editor-grupo" key={campo.chave}>
                        <span className="editor-rotulo">{campo.rotulo}</span>
                        <input
                            className="editor-campo"
                            type="number"
                            value={valores[campo.chave] ?? ""}
                            onChange={(evento) => setValores({ ...valores, [campo.chave]: evento.target.value })}
                        />
                    </label>
                ))}
            </div>

            <span className="editor-rotulo">Atributos</span>
            <div className="editor-numeros">
                {atributos.map((atributo) => (
                    <label className="editor-grupo" key={atributo.chave}>
                        <span className="editor-rotulo">{atributo.sigla}</span>
                        <input
                            className="editor-campo"
                            type="number"
                            value={valoresAtributos[atributo.chave] ?? ""}
                            onChange={(evento) =>
                                setValoresAtributos({ ...valoresAtributos, [atributo.chave]: evento.target.value })
                            }
                        />
                    </label>
                ))}
            </div>

            <span className="editor-rotulo">Perícias</span>
            <div className="editor-pericias">
                {pericias.map((pericia) => (
                    <label className="editor-pericia" key={pericia.chave}>
                        <span>{pericia.nome}</span>
                        <select
                            className="editor-campo"
                            value={valoresPericias[pericia.chave] || 0}
                            onChange={(evento) =>
                                setValoresPericias({ ...valoresPericias, [pericia.chave]: Number(evento.target.value) })
                            }
                        >
                            {graus.map((grau, indice) => (
                                <option key={grau} value={indice}>{grau}</option>
                            ))}
                        </select>
                    </label>
                ))}
            </div>

            <div className="editor-botoes">
                <button className="editor-salvar" onClick={salvar} disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar"}
                </button>
                <button className="editor-cancelar" onClick={aoCancelar}>Cancelar</button>
            </div>
        </div>
    )
}

export default EditorFicha