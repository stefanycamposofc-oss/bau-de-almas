import { useState } from "react"

function CapituloGaleria({ imagens }) {
    const [aberta, setAberta] = useState(null)

    if (imagens.length === 0) {
        return <p className="em-breve">Nenhuma imagem ainda.</p>
    }

    return (
        <>
            <div className="galeria-imagens">
                {imagens.map((imagem, indice) => (
                    <button className="miniatura" key={indice} onClick={() => setAberta(imagem)}>
                        <img src={imagem.src} alt={imagem.legenda} />
                    </button>
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