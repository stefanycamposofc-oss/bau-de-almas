function CapituloRelacoes({ relacoes }) {
    if (relacoes.length === 0) {
        return <p className="em-breve">Nenhuma relação anotada.</p>
    }

    return (
        <div className="relacoes">
            {relacoes.map((relacao) => (
                <article className="relacao" key={relacao.nome}>
                    {relacao.foto && (
                        <img className="relacao-foto" src={relacao.foto} alt={relacao.nome} />
                    )}
                    <span className="relacao-tipo">{relacao.tipo}</span>
                    <h3 className="relacao-nome">{relacao.nome}</h3>
                    <p className="relacao-descricao">{relacao.descricao}</p>
                </article>
            ))}
        </div>
    )
}

export default CapituloRelacoes