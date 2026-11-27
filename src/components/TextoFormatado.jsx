import Markdown from "react-markdown"
import remarkBreaks from "remark-breaks"

function TextoFormatado({ texto, className }) {
    return (
        <div className={className}>
            <Markdown remarkPlugins={[remarkBreaks]}>{texto || ""}</Markdown>
        </div>
    )
}

export default TextoFormatado