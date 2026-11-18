const camposBasicos = [
    { chave: "idade", rotulo: "Idade"},
    { chave: "genero", rotulo: "Gênero"},
    { chave: "raca", rotulo: "Raça"},
    { chave: "classe", rotulo: "Classe"},
    { chave: "origem", rotulo: "Origem"},
]

function CapituloBasico({ basico }) {
    return (
        <dl className="dados">
            {camposBasicos.map((campo) => (
                <div className="dado" key={campo.chave}>
                    <dt>{campo.rotulo}</dt>
                    <dd>{basico[campo.chave] || "—"}</dd>
                </div>
            ))}
        </dl>
    )
}

export default CapituloBasico