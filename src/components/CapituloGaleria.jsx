import { useState } from "react"

function CapituloGaleria({ imagens, aoEditar }) {
    const [aberta, setAberta] = useState(null)

    if (imagens.length === 0) {
        return <p className="em-breve">Nenhuma imagem ainda.</p>
    }

    return (
        <>
            <div className="galeria-imagens">
                {imagens.map((imagem, indice) => (
                <div className="galeria-item" key={indice}>
                    <button className="miniatura" onClick={() => setAberta(imagem)}>
                        <img src={imagem.src} alt={imagem.legenda} />
                        {imagem.legenda && <span className="miniatura-legenda">{imagem.legenda}</span>}
                    </button>
                    <button className="editar-capitulo" onClick={() => aoEditar(indice)}>Editar</button>
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