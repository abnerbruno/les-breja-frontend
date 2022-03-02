import './asserts/reset.css';
import './asserts/style.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './paginas/home';
import ListaCliente from './paginas/crudCliente/ListaCliente';
import EditarCliente from './paginas/crudCliente/EditarCliente';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path="/crudCliente" exact={true} component={ListaCliente}/>
          <Route path="/clientes/:id" component={EditarCliente}/>
        </Switch>
    </Router>
    )
  };
}

export default App;
