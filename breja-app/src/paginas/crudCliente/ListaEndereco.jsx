import React, { Component } from "react";
import { Container } from "reactstrap";
import Endereco from "./endereco";

class ListaEndereco extends Component {
    render(){
        return(
            <fieldset>
                <Container>
                <label htmlFor="endereco"><h3 className="mb-4" onClick={this.props.createEndereco}>Endereços</h3></label>
                 {this.props.enderecos.map((endereco, index) => {
                    return (
                        <Endereco 
                        key={index}
                        indice={index}
                        endereco={endereco}
                        editarEndereco={this.props.editarEndereco}
                        deleteEndereco={this.props.deleteEndereco}/>
                    );})
                }
                </Container>
            </fieldset>
        )
    }
}

export default ListaEndereco;