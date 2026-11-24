import { useState } from "react"

function EditorTexto({ valorInicial, aoSalvar, aoCancelar }) {
    const [texto, setTexto] = useState(valorInicial || "")
    const [salvando, setSalvando] = useState(false)

    async function salvar() {
        setSalvando(true)
        await aoSalvar(texto)
        setSalvando(false)
    }

    return (
        <div className="editor">
            <textarea
                className="editor-texto"
                value={texto}
                onChange={(evento) => setTexto(evento.target.value)}
            />
            <p className="editor-dica">Deixe uma linha em branco para começar um novo parágrafo.</p>

            <div className="editor-botoes">
                <button className="editor-salvar" onClick={salvar} disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar"}
                </button>
                <button className="editor-cancelar" onClick={aoCancelar}>Cancelar</button>
            </div>
        </div>
    )
}

export default EditorTexto