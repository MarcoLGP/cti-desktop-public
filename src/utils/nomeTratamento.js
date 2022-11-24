export default function tratamentoNome(nome) {
    return nome.includes(' ') ? nome.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase()) : nome[0].toUpperCase()
}