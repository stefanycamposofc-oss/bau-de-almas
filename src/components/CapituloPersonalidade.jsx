import CapituloEtiquetas from "./CapituloEtiquetas"

export const gruposPersonalidade = [
    { chave: "qualidades", rotulo: "Qualidades"},
    { chave: "defeitos", rotulo: "Defeitos"},
    { chave: "hobbies", rotulo: "Hobbies"},
    { chave: "manias", rotulo: "Manias"},
    { chave: "medos", rotulo: "Medos"},
    { chave: "traumas", rotulo: "Traumas"},
]

function CapituloPersonalidade({personalidade}) {
    return (
        <>
        <CapituloEtiquetas grupos={gruposPersonalidade} dados={personalidade} />

            {personalidade.sexualidade && (
                <div className="grupo">
                    <h3 className="grupo-titulo">Sexualidade</h3>
                    <p>{personalidade.sexualidade}</p>
                </div>
            )}
        </>
    )
}

export default CapituloPersonalidade