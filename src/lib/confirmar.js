let abrirConfirmacao = null

export function registrarConfirmacao(funcao) {
    abrirConfirmacao = funcao
}

export function confirmar(mensagem) {
    if (!abrirConfirmacao) {
        return Promise.resolve(window.confirm(mensagem))
    }

    return new Promise((resolver) => abrirConfirmacao(mensagem, resolver))
}