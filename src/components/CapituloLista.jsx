import TextoFormatado from "./TextoFormatado"

function CapituloLista({ itens, aoEditar }) {
    if (itens.length === 0) {
        return <p className="em-breve">Nada anotado.</p>
    }

    return (
        <div className="itens">
            {itens.map((item, indice) => (
                <article className="item" key={indice}>
                    <div className="item-texto">
                        <h3 className="item-nome">{item.nome}</h3>
                        {item.detalhe && <p className="item-detalhe">{item.detalhe}</p>}
                        <TextoFormatado texto={item.descricao} className="item-descricao" />
                        <button className="editar-capitulo editar-item" onClick={() => aoEditar(indice)}>Editar</button>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default CapituloLista