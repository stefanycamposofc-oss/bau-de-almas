import TextoFormatado from "./TextoFormatado"

function CapituloRelacoes({ relacoes, aoEditar }) {
    if (relacoes.length === 0) {
        return <p className="em-breve">Nenhuma relação anotada.</p>
    }

    return (
        <div className="relacoes">
            {relacoes.map((relacao, indice) => (
                <article className="relacao" key={relacao.nome}>
                    {relacao.foto && (
                        <img className="relacao-foto" src={relacao.foto} alt={relacao.nome} />
                    )}
                    <span className="relacao-tipo">{relacao.tipo}</span>
                    <h3 className="relacao-nome">{relacao.nome}</h3>
                    <TextoFormatado texto={relacao.descricao} className="relacao-descricao" />
                            {aoEditar && (
                                <button className="editar-capitulo editar-item" onClick={() => aoEditar(indice)}>Editar</button>
                            )}
                </article>
            ))}
        </div>
    )
}

export default CapituloRelacoes