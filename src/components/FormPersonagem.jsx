import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import "./FormPersonagem.css"

const sistemas = [
    "D&D",
    "Ordem Paranormal",
    "Tormenta",
    "Call of Cthulhu",
    "Vampiro",
    "Pathfinder",
    "Personagem de história",
]

function criarId(nome) {
    return nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}

function FormPersonagem({ aoSalvar }) {
    const navegar = useNavigate()

    const [nome, setNome] = useState("")
    const [resumo, setResumo] = useState("")
    const [sistema, setSistema] = useState("D&D")
    const [foto, setFoto] = useState("")
    const [erro, setErro] = useState("")
    const [salvando, setSalvando] = useState(false)

    async function salvar(evento) {
        evento.preventDefault()
        setErro("")
        setSalvando(true)

        const id = criarId(nome)

        const { error } = await supabase.from("personagens").insert({
            id: id,
            nome: nome,
            resumo: resumo,
            sistema: sistema,
            foto: foto || null,
        })

        if (error) {
            if (error.code === "23505") {
                setErro("Já existe uma personagem com esse nome.")
            } else {
                setErro("Não foi possível salvar. Tente de novo.")
            }
            setSalvando(false)
            return
        }

        await aoSalvar()
        navegar("/personagem/" + id, { replace: true })
    }

    return (
        <div className="form-pagina">
            <button className="voltar" onClick={() => navegar(-1)}>← Voltar</button>

            <form className="form-caixa" onSubmit={salvar}>
                <h1 className="form-titulo">Nova personagem</h1>

                <label className="form-rotulo" htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    className="form-campo"
                    value={nome}
                    onChange={(evento) => setNome(evento.target.value)}
                    required
                />

                <label className="form-rotulo" htmlFor="resumo">Resumo</label>
                <input
                    id="resumo"
                    className="form-campo"
                    placeholder="Ex.: Tiefling | Ladina"
                    value={resumo}
                    onChange={(evento) => setResumo(evento.target.value)}
                />

                <label className="form-rotulo" htmlFor="sistema">Sistema</label>
                <select
                    id="sistema"
                    className="form-campo"
                    value={sistema}
                    onChange={(evento) => setSistema(evento.target.value)}
                >
                    {sistemas.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

                <label className="form-rotulo" htmlFor="foto">Foto (caminho da imagem)</label>
                <input
                    id="foto"
                    className="form-campo"
                    placeholder="/personagens/nome/retrato.jpg"
                    value={foto}
                    onChange={(evento) => setFoto(evento.target.value)}
                />
                <p className="form-dica">Na Aula 24, isso vira um botão para enviar a imagem.</p>

                {erro && <p className="form-erro">{erro}</p>}

                <div className="form-botoes">
                    <button className="form-salvar" type="submit" disabled={salvando}>
                        {salvando ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormPersonagem