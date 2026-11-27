import Markdown from "react-markdown"
import remarkBreaks from "remark-breaks"

function CapituloTexto({ texto }) {
    return (
        <div className="texto-capitulo">
            <Markdown remarkPlugins={[remarkBreaks]}>{texto}</Markdown>
        </div>
    )
}

export default CapituloTexto