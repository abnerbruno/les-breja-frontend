import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
class TituloDaTabela extends Component {
    render() { 
        return (
            <div className="table-title">
            <div className="row">
              <div className="col-sm-3">
                <h2>Gerenciar <b>{this.props.nomeEntidade}</b></h2>
              </div>
              <div className="col-sm-6">
                <Button className="btn btn-success" tag={Link} to={"/" + this.props.nomeEntidade + "/new"}><span>Add</span></Button>			
              </div>
              <div className="col-sm-3">
                <form className="d-flex">
                  <input id="txtBusca" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button id="botaoenviar" type="submit">Buscar</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}
 
export default TituloDaTabela;