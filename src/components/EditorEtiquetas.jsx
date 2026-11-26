import { useState } from "react"

function EditorEtiquetas({ grupos, campoTexto, valorInicial, aoSalvar, aoCancelar}) {
    const [valores, setValores] = useState(valorInicial || {})
    const [novos, setNovos] = useState({})
    const [salvando, setSalvando] = useState(false)

    function adicionar(chave) {
        const texto = (novos[chave] || "").trim()

        if (!texto) {
            return
        }

        const lista = valores[chave] || []
        setValores({ ...valores, [chave]: [...lista, texto] })
        setNovos({ ...novos, [chave]: "" })
    }

    function remover(chave, indice) {
        const lista = valores[chave] || []

        if (!window.confirm('Remover "' + lista[indice] + '"?')) {
            return
        }
        
        setValores({ ...valores, [chave]: lista.filter((_item, i) => i !== indice) })
    }

    async function salvar() {
        setSalvando(true)
        await aoSalvar(valores)
        setSalvando(false)
    }

    return (
        <div className="editor">
            {grupos.map((grupo) => (
                <div className="editor-grupo" key={grupo.chave}>
                    <span className="editor-rotulo">{grupo.rotulo}</span>

                    <ul className="etiquetas">
                        {(valores[grupo.chave] || []).map((item, indice) => (
                            <li className="etiqueta" key={indice}>
                                {item}
                                <button
                                    className="etiqueta-remover"
                                    type="button"
                                    onClick={() => remover(grupo.chave, indice)}
                                    aria-label={"Remover " + item}
                                >
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="editor-adicionar">
                        <input
                            className="editor-campo"
                            placeholder="Adicionar..."
                            value={novos[grupo.chave] || ""}
                            onChange={(evento) => setNovos({ ...novos, [grupo.chave]: evento.target.value})}
                            onKeyDown={(evento) => {
                                if (evento.key === "Enter") {
                                    evento.preventDefault()
                                    adicionar(grupo.chave)
                            }
                        }}
                    />
                    <button className="editor-cancelar" type="button" onClick={() => adicionar(grupo.chave)}>+</button>
                    </div>
                </div>
            ))}

            {campoTexto && (
                <div className="editor-grupo">
                    <label className="editor-rotulo" htmlFor={campoTexto.chave}>{campoTexto.rotulo}</label>
                    <input
                        id={campoTexto.chave}
                        className="editor-campo"
                        value={valores[campoTexto.chave] || ""}
                        onChange={(evento) => setValores({ ...valores, [campoTexto.chave]: evento.target.value })}
                    />
                </div>
            )}

            <div className="editor-botoes">
                <button className="editor-salvar" onClick={salvar} disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar"}
                </button>
                <button className="editor-cancelar" onClick={aoCancelar}>Cancelar</button>
            </div>
        </div>
    )
}

export default EditorEtiquetas