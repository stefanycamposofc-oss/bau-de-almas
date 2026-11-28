import { useState } from "react"
import TextoFormatado from "./TextoFormatado"

function CapituloItens({ itens, aoEditar }) {
    const [aberta, setAberta] = useState(null)

    if (itens.length === 0) {
        return <p className="em-breve">Nada anotado.</p>
    }

    return (
        <>
            <div className="itens">
                {itens.map((item, indice) => (
                    <article className="item" key={item.nome}>
                        {item.imagem ? (
                            <button className="item-imagem-botao" onClick={() => setAberta(item)} aria-label={"Ampliar " + item.nome}>
                                <img className="item-imagem" src={item.imagem} alt={item.nome} />
                            </button>
                        ) : (
                            <div className="item-imagem item-sem-imagem">Sem imagem</div>
                        )}

                        <div className="item-texto">
                            <h3 className="item-nome">{item.nome}</h3>
                            {item.dano && <p className="item-dano">Dano: {item.dano}</p>}
                            <TextoFormatado texto={item.descricao} className="item-descricao" />

                            {item.efeitos && item.efeitos.length > 0 && (
                                <ul className="etiquetas">
                                    {item.efeitos.map((efeito) => (
                                        <li className="etiqueta" key={efeito}>{efeito}</li>
                                    ))}
                                </ul>
                            )}
                            <button className="editar-capitulo editar-item" onClick={() => aoEditar(indice)}>Editar</button>
                        </div>
                    </article>
                ))}
            </div>

            {aberta && (
                <div className="lightbox" onClick={() => setAberta(null)}>
                    <img className="lightbox-imagem" src={aberta.imagem} alt={aberta.nome} />
                    <p className="lightbox-legenda">{aberta.nome}</p>
                </div>
            )}
        </>
    )
}

export default CapituloItens