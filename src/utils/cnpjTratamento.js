import { mask } from 'validation-br/dist/cnpj'
import { isCNPJ } from 'validation-br'

export default function cnpjTratamento(cnpj, validate) {
    return validate ? isCNPJ(cnpj) : mask(cnpj)
}