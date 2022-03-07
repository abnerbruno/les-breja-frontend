import React, { Component } from "react";
import { Container } from "reactstrap";
import { ReactComponent as DeleteSGV } from "../../assets/img/delete.svg";

class Cartao extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartao: this.props.cartao,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartao !== this.props.cartao) {
      this.setState({ cartao: this.props.cartao });
      console.log(`Atulizado após ser mudado o props deste componente cartao`);
    }
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    const indice = this.props.indice;
    this.props.editarCartao(indice, name, value)
  }

  deleteCartao(){
    const indice = this.props.indice;
    this.props.deleteCartao(indice)
  }

  render(){
    const { cartao } = this.state;

      return(                
      <fieldset>
        <Container>
              <div className="row" >
                <div className="col-12 mb-3">
                  <input type="text" className="form-control" placeholder="Nº do Cartão" aria-label="Ncartao" name="numeroCartao" value={cartao.numeroCartao || ''}  onChange={this.handleChange} />
                </div>
                <div className="col mb-3">
                  <input type="text" className="form-control" placeholder="Tipo Conta" aria-label="TipoConta" name="tipoConta"  value={cartao.tipoConta || ''} onChange={this.handleChange} />
                </div>
                <div className="col mb-3">
                  <input type="number" className="form-control" placeholder="Código de Segurança" aria-label="numero" name="codigoSeguranca" value={cartao.codigoSeguranca || ''} onChange={this.handleChange} />
                </div>
                <div className="col mb-3">
                  <select className="form-select" aria-label="Default select example" name="bandeira">
                    <option selected>{cartao.bandeira || 'Bandeira'}</option>
                    <option value="visa">Visa</option>
                    <option value="master Card">Master Card</option>
                    <option value="3">03...</option>
                  </select>
                </div>

                <div className="col mb-3">
                  <input type="text" className="form-control" placeholder="descricao Cartão" aria-label="descricao" name="descricao" value={cartao.descricao || ''} onChange={this.handleChange} />
                </div>

                <div className="row">
                  <div className="form-check col mb-3">
                    <input className="form-check-input" type="radio" name="cartaoPrincipal" id="radiocartaoPrincipalChecked"/>
                    <label className="form-check-label" for="radiocartaoPrincipalChecked">Cartão Principal</label>
                  </div>

                  <div className="col">
                    <DeleteSGV onClick={this.props.deleteCartao} />
                  </div>
                </div>
              </div>  
        </Container>
      </fieldset>)
  };
};
export default Cartao;