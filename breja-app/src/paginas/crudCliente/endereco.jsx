import React, { Component } from "react";
import { ReactComponent as DeleteSGV } from "../../assets/img/delete.svg";

class Endereco extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      endereco: this.props.endereco,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.endereco !== this.props.endereco) {
      this.setState({ endereco: this.props.endereco });
      console.log(`Atulizado após ser mudado o props deste componente Endereço`);
    }
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    const indice = this.props.indice;
    this.props.editarEndereco(indice, name, value)
    
  }

  deleteEndereco(){
    const indice = this.props.indice;
    this.props.deleteEndereco(indice)
  }

  render() {
    const { endereco } = this.state;

    return (
      <div className="row">
        <div className="input-group col-12">
          <span className="input-group-text">{endereco.descricao}</span>
        </div>

        <div>
          <input
            type="text"
            className="form-control col-12 mb-3"
            placeholder="Longratouro"
            name="longadouro"
            onChange={this.handleChange}
            value={endereco.longadouro}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tipo Longratouro"
            aria-label="tipo longadouro"
            name="tipoLongadouro"
            onChange={this.handleChange}
            value={endereco.tipoLongadouro}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tipo de residência"
            aria-label="Tipo de residência"
            name="tipoResidencia"
            onChange={this.handleChange}
            value={endereco.tipoResidencia || ""}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Número"
            aria-label="numero"
            name="numero"
            onChange={this.handleChange}
            value={endereco.numero || ""}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Bairro"
            aria-label="bairro"
            name="bairro"
            onChange={this.handleChange}
            value={endereco.bairro || ""}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cidade"
            aria-label="cidade"
            name="cidade"
            onChange={this.handleChange}
            value={endereco.cidade || ""}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Estado"
            aria-label="estado"
            name="estado"
            onChange={this.handleChange}
            value={endereco.estado || ""}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="CEP"
            aria-label="cep"
            name="cep"
            onChange={this.handleChange}
            value={endereco.cep || ""}
          />
        </div>

        <div className="col-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pais"
            aria-label="pais"
            name="pais"
            onChange={this.handleChange}
            value={endereco.pais || ""}
          />
        </div>

        <div className="col-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Descrição"
            aria-label="descricao"
            name="descricao"
            onChange={this.handleChange}
            value={endereco.descricao || ""}
          />
        </div>

        <div className="form-check col">
          <input
            className="form-check-input"
            type="radio"
            name="enderecoCobranca"
            id="radioEnderecoCobrancaChecked"
          />
          <label className="form-check-label" htmlFor="radioEnderecoCobrancaChecked">
            Endereço de Cobrança
          </label>
        </div>

        <div className="form-check col mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="enderecoPagamento"
            id="radioEnderecoPagamentoChecked"
          />
          <label className="form-check-label" htmlFor="radioEnderecoPagamentoChecked">
            Endereço de Pagamento
          </label>
        </div>

        <div className="col">
          <DeleteSGV onClick={this.deleteEndereco.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Endereco;
