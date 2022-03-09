import { Component } from "react";
import { Container, Table, ButtonGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import TituloDaTabela from "../../component/TituloDaTabela";
import Footer from "../../component/Footer";

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
          <td className="text-center"> {cliente.id}</td>
          <td className="text-center"> {cliente.nomeCompleto}</td>
          <td className="text-center"> {cliente.cpf}</td>
          <td className="text-center"> {cliente.classificacao}</td>
          <td className="text-center"> {cliente.status}</td>
          <td className="text-center"> {cliente.email}</td>
          <td className="text-center"> {cliente.telefone}</td>
          <td className="text-center"> {cliente.dataNascimento}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/cliente/" + cliente.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(cliente.id)}
              >
                Delete
              </Button>
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
          <TituloDaTabela nomeEntidade={"Cliente"} />
          <Table id="lista" className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" className="text-center">ID</th>
                <th scope="col" className="text-center">Nome Completo</th>
                <th scope="col" className="text-center">CPF</th>
                <th scope="col" className="text-center">Rank</th>
                <th scope="col" className="text-center">Status</th>
                <th scope="col" className="text-center">Email</th>
                <th scope="col" className="text-center">Telefone</th>
                <th scope="col" className="text-center">Data Cadastro</th>
                <th scope="col" className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody id="tbody">{listaClientes}</tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ListaCliente;
