import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"
import "./FormPersonagem.css"
import CampoImagem from "./CampoImagem"
import { confirmar } from "../lib/confirmar"

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

function FormPersonagem({ personagens, aoSalvar }) {
    const navegar = useNavigate()
    const { id } = useParams()
    const existente = personagens.find((item) => item.id === id)
    const editando = Boolean(existente)

    const [nome, setNome] = useState(existente ? existente.nome : "")
    const [resumo, setResumo] = useState(existente ? existente.resumo : "")
    const [sistema, setSistema] = useState(existente ? existente.sistema : "D&D")
    const [foto, setFoto] = useState(existente ? existente.foto || "" : "")
    const [erro, setErro] = useState("")
    const [salvando, setSalvando] = useState(false)

    async function salvar(evento) {
        evento.preventDefault()
        setErro("")
        setSalvando(true)

        const dados = { nome: nome, resumo: resumo, sistema: sistema, foto: foto || null }
        const idFinal = editando ? existente.id : criarId(nome)

        let resposta
        if (editando) {
            resposta = await supabase.from("personagens").update(dados).eq("id", idFinal)
        } else {
            resposta = await supabase.from("personagens").insert({ id: idFinal, ...dados })
        }

        const error = resposta.error

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
        navegar("/personagem/" + idFinal, { replace: true })
    }
    
    async function apagar() {
        const certeza = await confirmar("Apagar " + existente.nome + "? Isso não pode ser desfeito.")

        if (!certeza) {
            return
        }

        const { error } = await supabase.from("personagens").delete().eq("id", existente.id)

        if (error) {
            setErro("Não foi possível apagar. Tente de novo.")
            return
        }

        await aoSalvar()
        navegar("/", { replace: true })
    }

    if (id && !existente) {
        return <p className="carregando">Personagem não encontrada.</p>
    }

    return (
        <div className="form-pagina">
            <button className="voltar" onClick={() => navegar(-1)}>← Voltar</button>

            <form className="form-caixa" onSubmit={salvar}>
                <h1 className="form-titulo">{editando ? "Editar personagem" : "Nova personagem"}</h1>

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

                    <span className="form-rotulo">Foto</span>
                    <CampoImagem valor={foto} aoMudar={setFoto} />

                {erro && <p className="form-erro">{erro}</p>}

                <div className="form-botoes">
                    <button className="form-salvar" type="submit" disabled={salvando}>
                        {salvando ? "Salvando..." : "Salvar"}
                    </button>
                    {editando &&(
                        <button className="form-apagar" type="button" onClick={apagar}>
                            Apagar personagem
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default FormPersonagem