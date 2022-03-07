import React, { Component } from "react";
import { Container } from "reactstrap";
import Categoria from "./Categoria";

class ListaCategoria extends Component {
    render(){
        return(
            <fieldset>
                <Container>
                <label htmlFor="categoria"><h3 className="mb-4" onClick={this.props.createCategoria}>Categorias</h3></label>
                 {this.props.categorias.map((categorias, index) => {
                    return (
                        <Categoria 
                        key={index}
                        indice={index}
                        categoria={categorias}
                        editarCategoria={this.props.editarCategoria}
                        deleteCategoria={this.props.deleteCategoria}/>
                    );})
                }
                </Container>
            </fieldset>
        )
    }
}

export default ListaCategoria;