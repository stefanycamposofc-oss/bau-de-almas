import { useState } from "react"
import { camposBasicos } from "./CapituloBasico"

function EditorBasico({ valorInicial, aoSalvar, aoCancelar }) {
    const [valores, setValores] = useState(valorInicial || {})
    const [salvando, setSalvando] = useState(false)

    function mudarCampo(chave, novoValor) {
        setValores({ ...valores, [chave]: novoValor })
    }

    async function salvar() {
        setSalvando(true)
        await aoSalvar(valores)
        setSalvando(false)
    }

    return (
        <div className="editor">
            {camposBasicos.map((campo) => (
                <div className="editor-linha" key={campo.chave}>
                    <label className="editor-rotulo" htmlFor={campo.chave}>{campo.rotulo}</label>
                    {campo.grande ? (
                        <textarea
                            id={campo.chave}
                            className="editor-campo editor-texto-curto"
                            value={valores[campo.chave] || ""}
                            onChange={(evento) => mudarCampo(campo.chave, evento.target.value)}
                        />
                    ) : (
                        <input
                            id={campo.chave}
                            className="editor-campo"
                            value={valores[campo.chave] || ""}
                            onChange={(evento) => mudarCampo(campo.chave, evento.target.value)}
                        />
                    )}
                </div>
            ))}

            <div className="editor-botoes">
                <button className="editor-salvar" onClick={salvar} disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar"}
                </button>
                <button className="editor-cancelar" onClick={aoCancelar}>Cancelar</button>
            </div>
        </div>
    )
}

export default EditorBasico