const cep = require('cep-promise')

export default function buscarCep(cepInput, setRes) {
    cep(cepInput).then(res => setRes(res)).catch(err => setRes(err))
}