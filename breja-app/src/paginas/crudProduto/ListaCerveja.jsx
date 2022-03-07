import { Component } from "react";
import { Container, Table, ButtonGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import TituloDaTabela from "../../component/TituloDaTabela";

class ListaCerveja extends Component {

  constructor(props) {
    super(props);
    this.state = { cervejas: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/cervejas")
      .then((response) => response.json())
      .then((data) => this.setState({ cervejas: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/cerveja/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedCervejas = [...this.state.cervejas].filter((i) => i.id !== id);
      this.setState({ Cervejas: updatedCervejas });
    });
  }

  render() {
    const { cervejas, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const listaCervejas = cervejas.map((cerveja) => {
      return (
        <tr key={cerveja.id}>
          <td>{cerveja.id}</td>
          <td>{cerveja.nome}</td>
          <td>{cerveja.nomeFornecedor}</td>
          <td>{cerveja.valorDeVenda}</td>
          <td>{cerveja.margemDeLucro}</td>
          <td>{cerveja.quantidade}</td>
          <td>{cerveja.status}</td>
          <td>{cerveja.descricao}</td>
          <td>{cerveja.dataCadastro}</td>
          <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/cerveja/" + cerveja.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(cerveja.id)}>Delete</Button>
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
          <TituloDaTabela nomeEntidade = {"Cerveja"} />
          <Table id="lista" className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Nome do Fornecedor</th>
                <th scope="col">Valor de Venda</th>
                <th scope="col">Margem de Lucro</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Status</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data Cadastro</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody id="tbody">
                {listaCervejas}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ListaCerveja;
