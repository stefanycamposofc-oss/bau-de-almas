import "./PaginaPersonagem.css"
import { useParams, useNavigate, Link } from "react-router-dom"
import CapituloBasico from "./CapituloBasico"
import CapituloTexto from "./CapituloTexto"
import CapituloPersonalidade from "./CapituloPersonalidade"
import CapituloEtiquetas from "./CapituloEtiquetas"
import CapituloRelacoes from "./CapituloRelacoes"
import CapituloItens from "./CapituloItens"
import CapituloGaleria from "./CapituloGaleria"
import FichaDnd from "./FichaDnd"
import FichaOrdem from "./FichaOrdem"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import EditorBasico from "./EditorBasico"
import EditorTexto from "./EditorTexto"
import EditorEtiquetas from "./EditorEtiquetas"
import { gruposPersonalidade } from "./CapituloPersonalidade"
import EditorFicha from "./EditorFicha"
import { atributosDnd, periciasDnd, grausDnd } from "./FichaDnd"
import { atributosOrdem, periciasOrdem, grausOrdem } from "./FichaOrdem"
import EditorCartoes from "./EditorCartoes"
import CapituloLista from "./CapituloLista"

const capitulos = [
    { id: "basico", titulo: "Informações básicas"},
    { id: "aparencia", titulo: "Aparência"},
    { id: "vestuario", titulo: "Vestuário"},
    { id: "armas", titulo: "Armas"},
    { id: "personalidade", titulo: "Personalidade"},
    { id: "gostos", titulo: "Gostos"},
    { id: "historia", titulo: "História"},
    { id: "objetivos", titulo: "Objetivos e segredos"},
    { id: "relacoes", titulo: "Relações"},
    { id: "galeria", titulo: "Galeria"},
    { id: "ficha", titulo: "Ficha"},
    { id: "habilidades", titulo: "Habilidades", soRpg: true },
    { id: "magias", titulo: "Magias", soRpg: true },
    { id: "anotacoes", titulo: "Anotações"},
]
const gruposGostos = [
    {chave: "comidas", rotulo: "Comidas" },
    {chave: "bebidas", rotulo: "Bebidas" },
    {chave: "musicas", rotulo: "Músicas" },
    {chave: "cores", rotulo: "Cores" },
    {chave: "lugares", rotulo: "Lugares" },
    {chave: "outros", rotulo: "Outros" },
]
const camposFichaDnd = [
    { chave: "nivel", rotulo: "Nível" },
    { chave: "ca", rotulo: "CA" },
    { chave: "vida", rotulo: "Vida" },
]
const camposFichaOrdem = [
    { chave: "nex", rotulo: "NEX (%)" },
    { chave: "pv", rotulo: "PV" },
    { chave: "pe", rotulo: "PE" },
    { chave: "sanidade", rotulo: "Sanidade" },
]
const camposTextoOrdem = [
    { chave: "classe", rotulo: "Classe" },
    { chave: "trilha", rotulo: "Trilha" },
    { chave: "origem", rotulo: "Origem" },
]
const camposRelacoes = [
    { chave: "nome", rotulo: "Nome" },
    { chave: "tipo", rotulo: "Tipo de relação" },
    { chave: "descricao", rotulo: "Descrição", grande: true },
    { chave: "foto", rotulo: "Foto", imagem: true },
]
const camposVestuario = [
    { chave: "nome", rotulo: "Nome" },
    { chave: "descricao", rotulo: "Descrição", grande: true },
    { chave: "imagem", rotulo: "Imagem", imagem: true },
]
const camposArmas = [
    { chave: "nome", rotulo: "Nome" },
    { chave: "dano", rotulo: "Dano" },
    { chave: "descricao", rotulo: "Descrição", grande: true },
    { chave: "efeitos", rotulo: "Efeitos (Separe por vírgula)", lista: true },
    { chave: "imagem", rotulo: "Imagem", imagem: true },
]
const camposGaleria = [
    { chave: "src", rotulo: "Imagem", imagem: true },
    { chave: "legenda", rotulo: "Legenda" }
]
const camposHabilidades = [
    { chave: "nome", rotulo: "Nome" },
    { chave: "detalhe", rotulo: "Tipo (classe, raça, talento, poder...)" },
    { chave: "descricao", rotulo: "Descrição", grande: true },
]
const camposMagias = [
    { chave: "nome", rotulo: "Nome" },
    { chave: "detalhe", rotulo: "Nível e escola (ex.: 1º nível · Evocação)" },
    { chave: "descricao", rotulo: "Descrição", grande: true },
]
const camposRituais = [
    { chave: "nome", rotulo: "Nome" },
    { chave: "detalhe", rotulo: "Círculo e elemento (ex.: 1º círculo · Sangue)" },
    { chave: "descricao", rotulo: "Descrição", grande: true },
]

function PaginaPersonagem({ personagens, aoSalvar }) {
    const { id, capitulo } = useParams()
    const navegar = useNavigate()
    const [editandoCapitulo, setEditandoCapitulo] = useState(false)
    const [cartaoEditando, setCartaoEditando] = useState(null)

    useEffect(() => {
        const linkAtivo = document.querySelector(".link-capitulo.ativo")

        if (linkAtivo) {
            linkAtivo.scrollIntoView({ block: "nearest", inline: "center" })
        }
    }, [capitulo])
    const personagem = personagens.find((item) => item.id === id)

    if (!personagem) {
        return <p>Personagem não encontrada.</p>
    }
    const ehHistoria = personagem.sistema === "Personagem de história"
    const ehOrdem = personagem.sistema === "Ordem Paranormal"
    const temFichaPropria = personagem.sistema === "D&D" || ehOrdem
    const capitulosVisiveis = capitulos
        .filter((cap) => !(ehHistoria && cap.id === "ficha"))
        .filter((cap) => !cap.soRpg || temFichaPropria)
        .map((cap) => (cap.id === "magias" && ehOrdem ? { ...cap, titulo: "Rituais" } : cap))
    const capituloAtual = capitulosVisiveis.find((cap) => cap.id === capitulo) || capitulosVisiveis[0]
    const dados = personagem[capituloAtual.id]
    const capitulosDeTexto = ["aparencia", "historia", "objetivos", "anotacoes"]

    let conteudo = <p className="em-breve">Este capítulo ainda está em branco.</p>

    if (capituloAtual.id === "basico" && dados){
        conteudo = <CapituloBasico basico={dados}/>
    } else if (capitulosDeTexto.includes(capituloAtual.id) && dados) {
        conteudo = <CapituloTexto texto={dados}/>
    } else if (capituloAtual.id === "personalidade" && dados) {
        conteudo = <CapituloPersonalidade personalidade={dados} />
    } else if (capituloAtual.id === "gostos" && dados) {
        conteudo = <CapituloEtiquetas grupos={gruposGostos} dados={dados}/>
    } else if (capituloAtual.id === "relacoes" && dados) {
        conteudo = <CapituloRelacoes relacoes={dados} aoEditar={setCartaoEditando} />
    } else if (["vestuario", "armas"].includes(capituloAtual.id) && dados) {
        conteudo = <CapituloItens itens={dados} aoEditar={setCartaoEditando} />
    } else if (capituloAtual.id === "galeria" && dados) {
        conteudo = <CapituloGaleria imagens={dados} aoEditar={setCartaoEditando} />
    } else if (["habilidades", "magias"].includes(capituloAtual.id) && dados) {
        conteudo = <CapituloLista itens={dados} aoEditar={setCartaoEditando} />
    } else if (capituloAtual.id === "ficha" && dados) {
        if (personagem.sistema === "D&D"){
            conteudo = <FichaDnd ficha={dados} />
        } else if (personagem.sistema ==="Ordem Paranormal") {
            conteudo = <FichaOrdem ficha={dados} />
        }
    }
    
const capitulosEditaveis = ["basico", ...capitulosDeTexto, "personalidade", "gostos", "relacoes", "vestuario", "armas", "galeria", "habilidades", "magias"]
const podeEditar = capitulosEditaveis.includes(capituloAtual.id) || (capituloAtual.id === "ficha" && temFichaPropria)
const camposDosCartoes = { 
    relacoes: camposRelacoes, 
    vestuario: camposVestuario, 
    armas: camposArmas, 
    galeria: camposGaleria,
    habilidades: camposHabilidades,
    magias: ehOrdem ? camposRituais : camposMagias,
}
const ehCartoes = capituloAtual.id in camposDosCartoes

    async function salvarCapitulo(novoValor) {
        const novosCapitulos = { ...personagem.capitulos, [capituloAtual.id]: novoValor }

        const { error } = await supabase
            .from("personagens")
            .update({ capitulos: novosCapitulos })
            .eq("id", personagem.id)

        if (error) {
            alert("Não foi possível salvar. Tente de novo.")
            return
        }

        await aoSalvar()
        setEditandoCapitulo(false)
        setCartaoEditando(null)
    }

    async function salvarCartao(cartoes) {
        const novaLista = [...(dados || [])]
        novaLista.splice(cartaoEditando, 1, ...cartoes)
        await salvarCapitulo(novaLista)
    }

    if (editandoCapitulo && capituloAtual.id === "basico") {
        conteudo = (
            <EditorBasico
                valorInicial={dados}
                aoSalvar={salvarCapitulo}
                aoCancelar={() => setEditandoCapitulo(false)}
            />
        )
    } else if (editandoCapitulo && capitulosDeTexto.includes(capituloAtual.id)) {
        conteudo = (
            <EditorTexto
                valorInicial={dados}
                aoSalvar={salvarCapitulo}
                aoCancelar={() => setEditandoCapitulo(false)}
            />
        )
    } else if (editandoCapitulo && capituloAtual.id === "personalidade") {
        conteudo = (
            <EditorEtiquetas
                grupos={gruposPersonalidade}
                campoTexto={{ chave: "sexualidade", rotulo: "Sexualidade" }}
                valorInicial={dados}
                aoSalvar={salvarCapitulo}
                aoCancelar={() => setEditandoCapitulo(false)}
            />
        )
    } else if (editandoCapitulo && capituloAtual.id === "gostos") {
        conteudo = (
            <EditorEtiquetas
                grupos={gruposGostos}
                valorInicial={dados}
                aoSalvar={salvarCapitulo}
                aoCancelar={() => setEditandoCapitulo(false)}
            />
        )
    } else if (editandoCapitulo && capituloAtual.id === "ficha") {
        const ehDnd = personagem.sistema === "D&D"

        conteudo = (
            <EditorFicha
                campos={ehDnd ? camposFichaDnd : camposFichaOrdem}
                campoTexto={ehDnd ? [] : camposTextoOrdem}
                atributos={ehDnd ? atributosDnd : atributosOrdem}
                pericias={ehDnd ? periciasDnd : periciasOrdem}
                graus={ehDnd ? grausDnd : grausOrdem}
                valorInicial={dados}
                aoSalvar={salvarCapitulo}
                aoCancelar={() => setEditandoCapitulo(false)}
            />
        )
    } else if (cartaoEditando !== null) {
        const lista = dados || []

        conteudo = (
            <EditorCartoes
                campos={camposDosCartoes[capituloAtual.id]}
                obrigatorio={capituloAtual.id === "galeria" ? "src" : "nome"}
                valorInicial={[lista[cartaoEditando] || {}]}
                unico
                aoSalvar={salvarCartao}
                aoCancelar={() => setCartaoEditando(null)}
            />
        )
    }

    return (
        <div className= "pagina-personagem">
            <button className= "voltar" onClick={() => navegar("/")}>← Voltar ao baú</button>

            <div className="perfil">
                {personagem.foto && (
                    <img className="perfil-foto" src={personagem.foto} alt={personagem.nome} />
                )}
                <div>
                    <span className="perfil-sistema">{personagem.sistema}</span>
                    <h1 className="perfil-nome">{personagem.nome}</h1>
                    <p className="perfil-resumo">{personagem.resumo}</p>
                    <button className="editar" onClick={() => navegar("/editar/" + personagem.id)}>Editar</button>
                </div>
        </div>
        <div className="capitulos">
            <nav className="menu-capitulos">
                {capitulosVisiveis.map((cap) => (
                    <Link
                        replace
                        key={cap.id}
                        to={"/personagem/" + personagem.id + "/" + cap.id}
                        onClick={() => {
                            setEditandoCapitulo(false)
                            setCartaoEditando(null)
                        }}
                        className={cap.id === capituloAtual.id ? "link-capitulo ativo" : "link-capitulo"}>
                            {cap.titulo}
                        </Link>
                ))}    
            </nav>

            <section className="conteudo-capitulo">
                <div className="capitulo-topo">
                    <h2>{capituloAtual.titulo}</h2>
                    {podeEditar && !editandoCapitulo && cartaoEditando === null && (
                        ehCartoes ? (
                            <button className="editar-capitulo" onClick={() => setCartaoEditando((dados || []).length)}>+ Adicionar</button>
                        ) : (
                            <button className="editar-capitulo" onClick={() => setEditandoCapitulo(true)}>Editar</button>
                        )
                    )}
                </div>
                {conteudo}
            </section>
        </div>
    </div>
    )
}

export default PaginaPersonagem