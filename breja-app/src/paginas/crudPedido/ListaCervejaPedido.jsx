import React, { Component } from "react";
import { Container } from "reactstrap";
import Cerveja from "./Cerveja";

class ListaCervejaPedido extends Component {
    render(){
        return(
            <fieldset>
                <Container>
                <label htmlFor="cerveja"><h3 className="mb-4" onClick={this.props.createCerveja}>Cervejas</h3></label>
                 {this.props.cervejas.map((cerveja, index) => {
                    return (
                        <Cerveja 
                        key={index}
                        indice={index}
                        cerveja={cerveja}
                        editarCerveja={this.props.editarCerveja}
                        deleteCerveja={this.props.deleteCerveja}/>
                    );})
                }
                </Container>
            </fieldset>
        )
    }
}

export default ListaCervejaPedido;