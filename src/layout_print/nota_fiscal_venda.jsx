import './nota_fiscal_venda.css'
import data from '../utils/data'
import React from 'react'
import logo from '../assets/logo-cti.png'
import QRCode from 'react-qr-code'
import FlatList from 'flatlist-react'

export default class NotaFiscalVenda extends React.Component {

  render() {

    function rowLista(item, index) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
          <div style={{ minWidth: '59px', maxWidth: '59px', borderRight: '1px black solid', borderBottom: '1px black solid', textAlign: 'center' }}>
            {`${index > 8 ? '' : 0}${index + 1}`}
          </div>
          <div style={{ maxWidth: '510px', minWidth: '510px', minHeight: 20, maxHeight: 20, paddingLeft: '8px', textOverflow: 'ellipsis', borderRight: '1px black solid', borderBottom: '1px black solid', overflow: 'hidden' }}>{item.Produto ? item.Produto : item.Servico}</div>
          <div style={{ maxWidth: '103px', minWidth: '103px', minHeight: 20, maxHeight: 20, borderBottom: '1px black solid', textAlign: 'center', overflow: 'hidden' }}>{`R$ ${item.Valor}`}</div>
        </div>
      )
    }

    return (
      <div id='containerNotaVenda'>
        <div id='conteudoNotaVenda' >
          <div id='cabecalhoNotaVenda' >
            <img height={60} style={{ marginRight: 52, marginLeft: 5 }} src={logo} />
            <div id='tituloNotaVenda' >
              <span>Centro Tecnológico de Informática</span>
              <span>Consultoria, Venda e Manutenção em Informática </span>
            </div>
            <QRCode size={50} style={{ marginLeft: 'auto', marginRight: 12 }} value={`${this.props.id}`} />
          </div>
          <div style={{ border: '1px black solid', width: '100%' }}>
            <p style={{ textAlign: 'center', margin: 10 }}>Nota Fiscal</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div id='blocosNotaVenda'>
              <span style={{ height: 55, overflow: 'hidden' }}>{`${this.props.cpf ? 'Cliente' : 'Empresa'}: ${this.props.nome}`}</span>
              <span id='bordaNotaVenda' style={{ height: 55, overflow: 'hidden' }}>{this.props.emp ? `Endereço: ${this.props.rua}, ${this.props.numero} - ${this.props.bairro}, ${this.props.cidade} - ${this.props.sigla}, ${this.props.cep}` : 'Endereço: '}</span>
              <span style={{ height: 30, overflow: 'hidden' }}>{this.props.cpf ? `CPF: ${this.props.cpf}` : `CNPJ: ${this.props.cnpj}`}</span>
              <span id='bordaNotaVenda' style={{ borderBottom: 'none', overflow: 'hidden' }}>{`Telefone: ${this.props.telefone ? this.props.telefone : ''}`}</span>
            </div>
            <div id='blocosNotaVenda'>
              <span style={{ height: 55 }}>Empresa: Cti Informatica - Centro Tecnologico de Informatica</span>
              <span id='bordaNotaVenda' style={{ height: 30 }}>CNPJ: 11.014.154/0001-59</span>
              <span id='bordaNotaVenda' style={{ height: 25 }}>Telefone: (22) 3831-3808</span>
              <span style={{ height: 35 }}>Endereço: Av. Fassbender, 37 - Centro, Bom Jesus do Itabapoana - RJ, 28360-000</span>
            </div>
          </div>
          <div style={{ border: '1px black solid', width: '100%' }}>
            <p style={{ textAlign: 'center', margin: 8 }}>Relação do comprovante</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ paddingLeft: '0.2%', border: '1px black solid', borderRight: '2px black solid', height: 700 }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div id='cod'>Item</div>
                <div id='produtoNotaVenda'>
                  <p>Descrição</p>
                </div>
                <div id='vUnitario'>V. Unitário</div>
              </div>
              <FlatList
                list={this.props.lista}
                renderItem={(item, index) => rowLista(item, index)}
              />
            </div>
          </div>
          <div id='footerNotaVenda'>
            <div style={{ width: '25%' }}>{`Emissão: ${data()}`}</div>
            <div style={{ width: '22%' }}>Garantia: 90 dias</div>
            <div style={{ width: '33%' }}>{`Pagamento: ${this.props.formPag}`}</div>
            <div style={{ width: '19%' }}>{`Total: R$ ${this.props.total}`}</div>
          </div>
        </div>
      </div>
    );
  }
}