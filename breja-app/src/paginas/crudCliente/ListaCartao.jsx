import React, { Component } from "react";
import { Container } from "reactstrap";
import Cartao from "./Cartao";

class ListaCartao extends Component {
    render(){
        return(
            <fieldset>
                <Container>
                <label htmlFor="cartao"><h3 onClick={this.props.createCartao}>Cartões</h3></label>
                 {this.props.cartoes.map((cartao, index) => {
                    return (
                        <Cartao
                        key={index}
                        indice={index}
                        cartao={cartao}
                        editarCartao={this.props.editarCartao}
                        deleteCartao={this.props.deleteCartao} />
                    );})
                }
                </Container>
            </fieldset>
        )
    }
}

export default ListaCartao;