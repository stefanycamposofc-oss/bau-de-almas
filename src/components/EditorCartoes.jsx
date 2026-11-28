import { useState } from "react"
import CampoImagem from "./CampoImagem"
import { confirmar } from "../lib/confirmar"

function textoParaEditar(valor) {
    return Array.isArray(valor) ? valor.join(", ") : valor || ""
}

function  EditorCartoes({ campos, valorInicial, aoSalvar, aoCancelar, obrigatorio = "nome", unico = false }) {
    const [cartoes, setCartoes] = useState(valorInicial || [])
    const [salvando, setSalvando] = useState(false) 

    function mudarCampo(indice, chave, novoValor) {
        setCartoes(cartoes.map((cartao, i) => (i === indice ? { ...cartao, [chave]: novoValor } : cartao)))
    }

    function adicionarCartao() {
        setCartoes([...cartoes, {}])
    }

async function removerCartao(indice) {
    if (!(await confirmar("Remover este item?"))) {
        return
    }
    if (unico) {
        aoSalvar([])
        return
    }

    setCartoes(cartoes.filter((_cartao, i) => i !== indice))
}

    async function salvar() {
        setSalvando(true)
        
        const cartoesLimpos = cartoes
            .filter((cartao) => cartao[obrigatorio])
            .map((cartao) => {
                const limpo = { ...cartao }

                campos.forEach((campo) => {
                    if (campo.lista) {
                        limpo[campo.chave] = textoParaEditar(cartao[campo.chave])
                            .split(",")
                            .map((parte) => parte.trim())
                            .filter((parte) =>parte !== "")
                    }
                })

                return limpo
            })

        await aoSalvar(cartoesLimpos)
        setSalvando(false)
    }

    return (
        <div className="editor">
            {cartoes.map((cartao, indice) => (
                <div className="editor-cartao" key={indice}>
                    {campos.map((campo) => campo.imagem ? (
                        <div className="editor-grupo" key={campo.chave}>
                            <span className="editor-rotulo">{campo.rotulo}</span>
                            <CampoImagem
                                valor={cartao[campo.chave] || ""}
                                aoMudar={(endereco) => mudarCampo(indice, campo.chave, endereco)}
                            />
                        </div>
                    ) : (
                        <label className="editor-grupo" key={campo.chave}>
                            <span className="editor-rotulo">{campo.rotulo}</span>
                            {campo.grande ? (
                                <textarea
                                    className="editor-campo editor-texto-curto"
                                    value={cartao[campo.chave] || ""}
                                    onChange={(evento) => mudarCampo(indice, campo.chave, evento.target.value)}
                                />
                            ) : (
                                <input
                                    className="editor-campo"
                                    value={textoParaEditar(cartao[campo.chave])}
                                    onChange={(evento) => mudarCampo(indice, campo.chave, evento.target.value)}
                                />
                            )}
                        </label>
                    ))}

                    <button className="editor-remover" type="button" onClick={() => removerCartao(indice)}>
                        Remover
                    </button>
                </div>
            ))}

            {!unico && (
                <button className="editor-cancelar editor-novo" type="button" onClick={adicionarCartao}>
                    + Adicionar
                </button>
            )}    

            <div className="editor-botoes">
                <button className="editor-salvar" onClick={salvar} disabled={salvando}>
                    { salvando ? "Salvando..." : "Salvar"}
                </button>
                <button className="editor-cancelar" onClick={aoCancelar}>Cancelar</button>
            </div>
        </div>
    )
}

export default EditorCartoes