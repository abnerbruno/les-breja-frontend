import { Component } from "react";
import { Container, Table, ButtonGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import TituloDaTabela from "../../component/TituloDaTabela";
import Footer from "../../component/Footer";

class ListaPedido extends Component {

  constructor(props) {
    super(props);
    this.state = { Pedidos: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/pedidos")
      .then((response) => response.json())
      .then((data) => this.setState({ Pedidos: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/pedido/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedPedidos = [...this.state.Pedidos].filter((i) => i.id !== id);
      this.setState({ Pedidos: updatedPedidos });
    });
  }

  render() {
    const { Pedidos, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const listaPedidos = Pedidos.map((pedido) => {
      return (
        <tr key={pedido.id}>
          <td className="text-center"> {pedido.id}</td>
          <td className="text-center"> {pedido.nomeCliente}</td>
          <td className="text-center"> {pedido.emailCliente}</td>
          <td className="text-center"> {pedido.cervejas.length}</td>
          <td className="text-center"> {pedido.valorTotal}</td>
          <td className="text-center"> {pedido.frete}</td>
          <td className="text-center"> {pedido.status}</td>
          <td className="text-center"> {pedido.dataCadastro}</td>
          <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/pedido/" + pedido.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(pedido.id)}>Delete</Button>
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
          <TituloDaTabela nomeEntidade = {"Pedido"} />
          <Table id="lista" className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" className="text-center">ID</th>
                <th scope="col" className="text-center">Cliente Solicitante</th>
                <th scope="col" className="text-center">Email Solicitante</th>
                <th scope="col" className="text-center">Quantidade Produtos</th>
                <th scope="col" className="text-center">Valor Total</th>
                <th scope="col" className="text-center">Frete</th>
                <th scope="col" className="text-center">Status</th>
                <th scope="col" className="text-center">Data Venda</th>
                <th scope="col" className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody id="tbody">
                {listaPedidos}
            </tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ListaPedido;