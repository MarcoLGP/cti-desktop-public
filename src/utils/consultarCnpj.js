import consultaCnpj from 'consultar-cnpj'

export default async function consultarCnpj(cnpj, set) {
    const reqConsulta = await consultaCnpj(cnpj)
    set(reqConsulta.nome_fantasia)
}