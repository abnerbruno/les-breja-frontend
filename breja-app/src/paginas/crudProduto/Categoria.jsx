import React, { Component } from "react";
import { Container } from "reactstrap";
import { ReactComponent as DeleteSGV } from "../../assets/img/delete.svg";

class Categoria extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoria: this.props.categoria,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoria !== this.props.categoria) {
      this.setState({ categoria: this.props.categoria });
      console.log(`Atulizado após ser mudado o props deste componente categoria`);
    }
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    const indice = this.props.indice;
    this.props.editarCategoria(indice, name, value)
  }

  deleteCategoria(){
    const indice = this.props.indice;
    this.props.deleteCategoria(indice)
  }

  render(){
    const { categoria } = this.state;

      return(                
      <fieldset>
              <div className="row" >

                <div className="input-group col mb-3">
                  <span className="input-group-text">Categoria</span>
                  <input type="text" className="form-control" placeholder="nome" aria-label="nome" name="nome" value={categoria.nome || ''}  onChange={this.handleChange} />
                </div>

                <div className="input-group col mb-3">
                  <span className="input-group-text">Descrição</span>
                  <input type="text" className="form-control" placeholder="Descricao" aria-label="descricao" name="descricao"  value={categoria.descricao || ''} onChange={this.handleChange} />
                </div>

                <div className="col">
                  <DeleteSGV onClick={this.props.deleteCategoria} />
                </div>

              </div>  
      </fieldset>)
  };
};
export default Categoria;