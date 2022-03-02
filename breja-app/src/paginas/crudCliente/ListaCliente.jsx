import { Component } from "react";
import { Container, Table, ButtonGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import TituloDaTabela from "../../component/TituloDaTabela";

class ListaCliente extends Component {
  constructor(props) {
    super(props);
    this.state = { clientes: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/clientes")
      .then((response) => response.json())
      .then((data) => this.setState({ clientes: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/cliente/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedClientes = [...this.state.clientes].filter((i) => i.id !== id);
      this.setState({ clientes: updatedClientes });
    });
  }

  render() {
    const { clientes, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const listaClientes = clientes.map((cliente) => {
      return (
        <tr key={cliente.id}>
          <td>{cliente.id}</td>
          <td>{cliente.nomeCompleto}</td>
          <td>{cliente.cpf}</td>
          <td>{cliente.rank}</td>
          <td>{cliente.status}</td>
          <td>{cliente.email}</td>
          <td>{cliente.telefone}</td>
          <td>{cliente.dataNascimento}</td>
          <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/clientes/" + cliente.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(cliente.id)}>Delete</Button>
          </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Header />
        <NavBar />
        <Container>
          <TituloDaTabela nomeEntidade = {"clientes"} />
          <Table id="lista" className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome Completo</th>
                <th scope="col">CPF</th>
                <th scope="col">Rank</th>
                <th scope="col">Status</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
                <th scope="col">Data Cadastro</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody id="tbody">
                {listaClientes}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ListaCliente;
