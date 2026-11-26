import { useState } from "react"
import { supabase } from "../lib/supabase"
import "./CampoImagem.css"

function CampoImagem({ valor, aoMudar }) {
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState("")

    async function enviar(evento) {
        const arquivo = evento.target.files[0]

        if (!arquivo){
            return
        }

        if (arquivo.size > 5 * 1024 * 1024) {
            setErro("A imagem precisa ter no máximo 5MB.")
            return
        }

        setErro("")
        setEnviando(true)

        const { data: dadosUsuario } = await supabase.auth.getUser()
        const extensao = arquivo.name.split(".").pop()
        const caminho = dadosUsuario.user.id + "/" + Date.now() + "." + extensao

        const { error } = await supabase.storage.from("imagens").upload(caminho, arquivo)

        if (error) {
            setErro("Não foi possível enviar a imagem. Tente de novo.")
            setEnviando(false)
            return
        }

        const { data } = supabase.storage.from("imagens").getPublicUrl(caminho)
        aoMudar(data.publicUrl)
        setEnviando(false)
    }

    return (
         <div className="campo-imagem">
            {valor && <img className="campo-imagem-previa" src={valor} alt="Prévia" />}

            <label className="campo-imagem-botao">
                {enviando ? "Enviando..." : valor ? "Trocar imagem" : "Escolher imagem"}
                <input type="file" accept="image/*" onChange={enviar} disabled={enviando} hidden />
            </label>

            {valor && !enviando && (
                <button className="campo-imagem-remover" type="button" onClick={() => window.confirm("Remover esta imagem?") && aoMudar("")}>
                    Remover imagem
                </button>
            )}

            {erro && <p className="campo-imagem-erro">{erro}</p>}
         </div>
    )
}

export default CampoImagem