import "./CardPersonagem.css"
import { useState } from "react"

function CardPersonagem({ nome, resumo, sistema, foto, aoAbrir }) {
    const [fotoQuebrada, setFotoQuebrada] = useState("")
    const inicial = nome.charAt(0)
    const ehHistoria = sistema === "Personagem de história"
    const carimbo = ehHistoria ? "HISTÓRIA" : "RPG"

    return(
        <div className="ficha" onClick={aoAbrir}>
            <span className="ficha-titulo">REGISTRO DE ALMA</span>
            <div className="ficha-corpo">
                <div className="ficha-campos">
                    <p className="campo"><span className="rotulo">Nome:</span> {nome}</p>
                    <p className="campo"><span className="rotulo">Descrição:</span> {resumo}</p>
                    <p className="campo"><span className="rotulo">Sistema:</span> {sistema}</p>
                </div>
                <div className="ficha-foto">
                    {foto && foto !== fotoQuebrada ? (
                        <img className="foto-img" src={foto} alt={nome} onError={() => setFotoQuebrada(foto)} />
                    ) : (
                        inicial
                    )}                    <span className="clipe"></span>
                </div>
            </div>
            <span className="carimbo">{carimbo}</span>
        </div>
    )
}

export default CardPersonagem