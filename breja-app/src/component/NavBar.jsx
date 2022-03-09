import { Component } from "react";

class NavBar extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4" aria-label="Tenth navbar example">
                <div className="container-fluid">
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
            
                  <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/listaCliente">Clientes</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/listaCerveja">Cervejas</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/listaPedido">Pedidos</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/listaEnvios">Envios</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/listaCupons">Cupum</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/listaUsuarios">Usuarios</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/listaTrocas">Trocas</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
        )
    };
}

export default NavBar;