import TextoFormatado from "./TextoFormatado"

export const camposBasicos = [
    { chave: "idade", rotulo: "Idade"},
    { chave: "genero", rotulo: "Gênero"},
    { chave: "raca", rotulo: "Raça"},
    { chave: "classe", rotulo: "Classe"},
    { chave: "origem", rotulo: "Origem", grande: true },
]

function CapituloBasico({ basico }) {
    return (
        <dl className="dados">
            {camposBasicos.map((campo) => (
                <div className="dado" key={campo.chave}>
                    <dt>{campo.rotulo}</dt>
                    <dd>
                        <TextoFormatado texto={basico[campo.chave] || "—"} className="dado-texto" />
                    </dd>
                </div>
            ))}
        </dl>
    )
}

export default CapituloBasico