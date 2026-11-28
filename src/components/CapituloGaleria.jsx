import { useState } from "react"

export function imagensDosCapitulos(personagem) {
    const imagens = []

    if (personagem.foto) {
        imagens.push({ src: personagem.foto, legenda: personagem.nome, origem: "Foto" })
    }

    const fontes = [
        { lista: personagem.vestuario, chave: "imagem", origem: "Vestuário" },
        { lista: personagem.armas, chave: "imagem", origem: "Armas" },
        { lista: personagem.relacoes, chave: "foto", origem: "Relações" },
    ]

    fontes.forEach((fonte) => {
        (fonte.lista || []).forEach((item) => {
            if (item[fonte.chave]) {
                imagens.push({ src: item[fonte.chave], legenda: item.nome, origem: fonte.origem })
            }
        })
    })

    return imagens
}

function CapituloGaleria({ imagens, automaticas = [], aoEditar }) {
    const [aberta, setAberta] = useState(null)
    const todas = [...imagens, ...automaticas]

    if (todas.length === 0) {
        return <p className="em-breve">Nenhuma imagem ainda.</p>
    }

    return (
        <>
            <div className="galeria-imagens">
                {todas.map((imagem, indice) => (
                    <div className="galeria-item" key={indice}>
                        <button className="miniatura" onClick={() => setAberta(imagem)}>
                            <img src={imagem.src} alt={imagem.legenda} />
                            {imagem.legenda && <span className="miniatura-legenda">{imagem.legenda}</span>}
                        </button>

                        {imagem.origem ? (
                            <span className="galeria-origem">De: {imagem.origem}</span>
                        ) : (
                            aoEditar && <button className="editar-capitulo" onClick={() => aoEditar(indice)}>Editar</button>
                        )}
                    </div>
                ))}
            </div>

            {aberta && (
                <div className="lightbox" onClick={() => setAberta(null)}>
                    <img className="lightbox-imagem" src={aberta.src} alt={aberta.legenda} />
                    {aberta.legenda && <p className="lightbox-legenda">{aberta.legenda}</p>}
                </div>
            )}
        </>
    )
}

export default CapituloGaleria