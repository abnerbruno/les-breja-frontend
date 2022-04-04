import React, { Component } from "react";
import { ReactComponent as DeleteSGV } from "../../assets/img/delete.svg";

class Cerveja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cerveja: this.props.cerveja,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cerveja !== this.props.cerveja) {
      this.setState({ cerveja: this.props.cerveja });
      console.log(`Atulizado após ser mudado o props deste componente Cerveja`);
    }
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const indice = this.props.indice;
    this.props.editarCerveja(indice, name, value);
  }

  deleteCerveja() {
    const indice = this.props.indice;
    this.props.deleteCerveja(indice);
  }

  render() {
    const { cerveja } = this.state;

    return (
      <div className="row mb-4">

        <div className="input-group mb-3 col-12">
          <span className="input-group-text">nome</span>
          <input
            type="text"
            aria-label="nome"
            className="form-control"
            name="nome"
            value={cerveja.nome || ""}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3 col-12">
          <span className="input-group-text">nomeFornecedor</span>
          <input
            type="text"
            aria-label="nomeFornecedor"
            className="form-control"
            name="nomeFornecedor"
            value={cerveja.nomeFornecedor || ""}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3 col">
          <span className="input-group-text">ID Cerveja</span>
          <input
            type="text"
            aria-label="id"
            className="form-control"
            name="id"
            value={cerveja.id || ""}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3 col">
          <span className="input-group-text">valorDeVenda</span>
          <input
            type="text"
            aria-label="valorDeVenda"
            className="form-control"
            name="valorDeVenda"
            value={cerveja.valorDeVenda || ""}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3 col">
          <span className="input-group-text">Status</span>
          <input
            type="text"
            aria-label="valorDeVenda"
            className="form-control"
            name="status"
            value={cerveja.status || ""}
            onChange={this.handleChange}
          />
        </div>

        <div className="input-group mb-3 col">
          <span className="input-group-text">descricao</span>
          <input
            type="text"
            aria-label="descricao"
            className="form-control"
            name="descricao"
            value={cerveja.descricao || ""}
            onChange={this.handleChange}
          />
        </div>

        <div className="col">
          <DeleteSGV onClick={this.deleteCerveja.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Cerveja;
