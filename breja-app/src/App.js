import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    isLoading: true,
    clientes: []
  };

  async componentDidMount() {
    const response = await fetch('/api/clientes');
    const body = await response.json();
    this.setState({ clientes: body, isLoading: false });
  }

  render() {
    const {clientes, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    console.log(clientes);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>clientes List</h2>
            {clientes.map(group =>
              <div key={group.id}>
                <p>{group.nomeCompleto}</p>
                <p>{group.cpf}</p>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
