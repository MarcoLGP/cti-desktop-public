import { mask } from 'validation-br/dist/cpf'
import { isCPF } from 'validation-br'

export default function cpfTratamento(cpf, validate) {
    return validate ? isCPF(cpf) : mask(cpf)
}