import { useState } from "react"
import { supabase } from "../lib/supabase"
import "./Login.css"

function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const [entrando, setEntrando] = useState(false)

    async function entrar(evento) {
        evento.preventDefault()
        setErro("")
        setEntrando(true)

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if (error) {
            setErro("E-mail ou senha incorretos.")
        }

        setEntrando(false)
    }

    return (
        <div className="login">
            <form className="login-caixa" onSubmit={entrar}>
                <h1 className="login-titulo">Baú de Almas</h1>
                <p className="login-subtitulo">Só a guardiã pode abrir o baú.</p>

                <label className="login-rotulo" htmlFor="email">E-mail</label>
                <input
                    id="email"
                    className="login-campo"
                    type="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                    required
                />

                <label className="login-rotulo" htmlFor="senha">Senha</label>
                <input
                    id="senha"
                    className="login-campo"
                    type="password"
                    value={senha}
                    onChange={(evento) => setSenha(evento.target.value)}
                    required
                />

                {erro && <p className="login-erro">{erro}</p>}

                <button className="login-botao" type="submit" disabled={entrando}>
                    {entrando ? "Abrindo..." : "Abrir o baú"}
                </button>
            </form>
        </div>
    )
}

export default Login