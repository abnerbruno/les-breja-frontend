import { Component } from "react";

class Header extends Component {
    render(){
        return(
            <header className="border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start mb-4">      
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
                <li><a href="/produtos" className="nav-link px-2 link-dark">Produtos</a></li>
                <li><a href="/trocas" className="nav-link px-2 link-dark">Troca</a></li>
                <li><a href="/contato" className="nav-link px-2 link-dark">Contato</a></li>
              </ul>
      
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search"></input>
              </form>
      
              <div className="dropdown text-end">
                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                </a>
                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                  <li><a className="dropdown-item" href="#teste" data-bs-toggle="modal">Cadastro</a></li>
                  <li><a className="dropdown-item" href="/dadosConta">Dados da Conta</a></li>
                  <li><a className="dropdown-item" href="Carrinho">Carrinho</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="Logout">Sign out</a></li>
                </ul>
              </div>
          </div>
      </header>
        )
    }
}

export default Header;