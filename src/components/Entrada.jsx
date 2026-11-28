import { useState, useEffect } from "react"
import Login from "./Login"
import "./Entrada.css"

function Entrada({ aoVisitar }) {
    const [etapa, setEtapa] = useState("trancado")
    const [mostrarLogin, setMostrarLogin] = useState(false)
    const [pronta, setPronta] = useState(false)

    useEffect(() => {
        const nomes = ["floresta-fundo", "arvores-meio", "arvores-frente", "bau-trancado", "bau-destrancado", "bau-aberto"]

        const carregamentos = nomes.map((nome) => {
            const imagem = new Image()
            imagem.src = "/entrada/" + nome + ".webp"
            return imagem.decode().catch(() => {})
        })

        Promise.all(carregamentos).then(() => setPronta(true))
    }, [])

    function abrir() {
        setEtapa("destrancado")
        setTimeout(() => setEtapa("aberto"), 900)
        setTimeout(() => setMostrarLogin(true), 2200)
    }

    return (
        <div className={pronta ? "entrada pronta" : "entrada"}>
            <div className="cena">
                <img className="camada camada-fundo" src="/entrada/floresta-fundo.webp" alt="" />
                <img className="camada camada-meio" src="/entrada/arvores-meio.webp" alt="" />

                <div className={"bau " + etapa}>
                    <div className={etapa === "aberto" ? "bau-brilho visivel" : "bau-brilho"} />
                    <div className="bau-sombra" />
                    <img
                        className={etapa === "trancado" ? "bau-img visivel" : "bau-img"}
                        src="/entrada/bau-trancado.webp"
                        alt="Um baú antigo e trancado no meio da floresta"
                    />
                    <img
                        className={etapa === "destrancado" ? "bau-img bau-por-cima visivel" : "bau-img bau-por-cima"}
                        src="/entrada/bau-destrancado.webp"
                        alt=""
                    />
                    <img
                        className={etapa === "aberto" ? "bau-img bau-por-cima visivel" : "bau-img bau-por-cima"}
                        src="/entrada/bau-aberto.webp"
                        alt=""
                    />
                </div>

                <img className="camada camada-frente" src="/entrada/arvores-frente.webp" alt="" />
            </div>

            {etapa === "trancado" && (
                <button className="entrada-botao" onClick={abrir}>Abrir</button>
            )}

            {mostrarLogin && (
                <div className="entrada-login">
                    <Login aoVisitar={aoVisitar} />
                </div>
            )}
        </div>
    )
}

export default Entrada