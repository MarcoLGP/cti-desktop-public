import './pattern.css'
import React from 'react'
import logo from '../assets/logo-cti.png'
import QRCode from 'react-qr-code'
import data from '../utils/data'

export default class Pattern extends React.Component {

  render() {
    return (
      <div id='containerPrintFicha'>
        <div id='conteudoPrintFicha' >
          <div id='cabecalhoPrintFicha' >
            <img height={60} src={logo} />
            <div id='tituloPrintFicha' >
              <span>Centro Tecnológico de Informática</span>
              <span>Consultoria, Venda e Manutenção em Informática </span>
            </div>
          </div>
          <div id='corpoPrintFicha'>
            <QRCode style={{ marginTop: 20 }} size={180} value={this.props.fichaId} />
            <span style={{ fontWeight: 'bold', marginTop: 10 }} >Data: {data()} às</span>
            <span style={{ fontWeight: 'bold', marginTop: 5 }} >{data(true)}</span>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }} >
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }} >
                <span>_____________________________________</span>
                <span style={{ alignSelf: 'center' }} >Tecnico responsável</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }}>
                <span style={{ marginLeft: '10%' }} >_____________________________________</span>
                <span style={{ alignSelf: 'center', marginLeft: '20%' }}>Cliente</span>
              </div>
            </div>
            <div id='footerPrintFicha'>
              <span>*ATENÇÃO: Aparelhos consertados e não retirados:</span>
              <span>-Após 30 dias será cobrada uma retribuição de depósito e conservação do mesmo.</span>
              <span>-Após 90 dias o aparelho será vendido para evitar despesas de depósito.</span>
            </div>
          </div>
        </div>
        <div id='conteudoInferiorPrintFicha'>
          <div id='cabecalhoInferiorPrintFicha'>
            <img height={60} src={logo} />
            <div id='tituloInferiorPrintFicha' >
              <span>Centro Tecnológico de Informática</span>
              <span>Consultoria, Venda e Manutenção em Informática </span>
            </div>
          </div>
          <div id='tituloFicha'>Ficha de Entrada</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Cliente: {this.props.nome}</span>
            <span>Telefone: {this.props.telefone}</span>
            <span>Data: {data()}</span>
            <span>Equipamento: {this.props.equipamento}</span>
            <span>Problema: {this.props.problema}</span>
            <span>Serviço feito: </span>
            <span>Orçamento: </span>
          </div>
          <div style={{ textAlign: 'center', paddingBottom: 15 }}>
            <QRCode style={{ marginTop: 20 }} size={180} value={this.props.fichaId} />
          </div>
        </div>
      </div>
    );
  }
}