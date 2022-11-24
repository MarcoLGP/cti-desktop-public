function custoLucro(estoque, setCusto, setLucro, setNegativo) {

        let somaValor = 0
        let somaCusto = 0

        estoque.map(estoque => {
                if (estoque.Custo) somaCusto += (estoque.Custo * estoque.Unidades)
                if (estoque.Valor) somaValor += (estoque.Valor * estoque.Unidades)
        })

        let lucro = somaValor - somaCusto

        if (lucro < 0) {
                setNegativo(true)
                lucro *= -1
        }

        somaCusto = somaCusto.toFixed(2).toString().replace('.', ',')
        lucro = lucro.toFixed(2).toString().replace('.', ',')

        setCusto(somaCusto)
        setLucro(lucro)
}

function balanco(contas, setNegativo, setReceber, setRes, setPagar) {

        let somaPagar = 0
        let somaReceber = 0

        contas.map(conta => {
                if (conta.Conta == 'Pagar') somaPagar += conta.Valor
                else if (conta.Conta == 'Receber') somaReceber += conta.Valor
        })

        let res = somaReceber - somaPagar

        if (res < 0) {
                res *= -1
                setNegativo(true)
        }

        res = res.toFixed(2).toString().replace('.', ',')
        somaPagar = somaPagar.toFixed(2).toString().replace('.', ',')
        somaReceber = somaReceber.toFixed(2).toString().replace('.', ',')        

        setRes(res)
        setReceber(somaReceber)
        setPagar(somaPagar)
}

export { balanco, custoLucro }