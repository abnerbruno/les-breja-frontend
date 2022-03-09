import './assets/reset.css';
import './assets/style.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListaCliente from './paginas/crudCliente/ListaCliente';
import EditarCliente from './paginas/crudCliente/EditarCliente';
import ListaCerveja from './paginas/crudProduto/ListaCerveja';
import EditarCerveja from './paginas/crudProduto/EditarCerveja';
import ListaPedido from './paginas/crudPedido/ListaPedido';
import EditarPedido from './paginas/crudPedido/EditarPedido';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={ListaCliente}/>
          <Route path="/listaCliente" exact={true} component={ListaCliente}/>
          <Route path="/cliente/:id" component={EditarCliente}/>

          <Route path="/listaCerveja" exact={true} component={ListaCerveja}/>
          <Route path="/cerveja/:id" component={EditarCerveja}/>

          <Route path="/listaPedido" exact={true} component={ListaPedido}/>
          <Route path="/pedido/:id" component={EditarPedido}/>
        </Switch>
    </Router>
    )
  };
}

export default App;
