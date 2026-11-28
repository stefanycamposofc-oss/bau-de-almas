import { useState, useEffect } from "react"
import { registrarConfirmacao } from "../lib/confirmar"
import "./Confirmacao.css"

function Confirmacao() {
    const [pedido, setPedido] = useState(null)

    useEffect(() => {
        registrarConfirmacao((mensagem, resolver) => setPedido({ mensagem, resolver }))
        return () => registrarConfirmacao(null)
    }, [])

    useEffect(() => {
        if (!pedido) {
            return
        }

        function aoApertarTecla(evento) {
            if (evento.key === "Escape") {
                pedido.resolver(false)
                setPedido(null)
            }
        }

        window.addEventListener("keydown", aoApertarTecla)
        return () => window.removeEventListener("keydown", aoApertarTecla)
    }, [pedido])

    if (!pedido) {
        return null
    }

    function responder(resposta) {
        pedido.resolver(resposta)
        setPedido(null)
    }

    return (
        <div className="confirmacao-fundo" onClick={() => responder(false)}>
            <div
                className="confirmacao-caixa"
                role="alertdialog"
                aria-modal="true"
                onClick={(evento) => evento.stopPropagation()}
            >
                <p className="confirmacao-titulo">Tem certeza?</p>
                <p className="confirmacao-mensagem">{pedido.mensagem}</p>

                <div className="confirmacao-botoes">
                    <button className="confirmacao-cancelar" onClick={() => responder(false)} autoFocus>
                        Cancelar
                    </button>
                    <button className="confirmacao-confirmar" onClick={() => responder(true)}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirmacao