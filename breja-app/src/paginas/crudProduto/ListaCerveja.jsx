import { Component } from "react";
import { Container, Table, ButtonGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";
import TituloDaTabela from "../../component/TituloDaTabela";
import Footer from "../../component/Footer";

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
      this.setState({ cervejas: updatedCervejas });
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
          <td className="text-center"> {cerveja.id}</td>
          <td className="text-center"> {cerveja.nome}</td>
          <td className="text-center"> {cerveja.nomeFornecedor}</td>
          <td className="text-center"> {cerveja.valorDeVenda}</td>
          <td className="text-center"> {cerveja.margemDeLucro}</td>
          <td className="text-center"> {cerveja.status}</td>
          <td className="text-center"> {cerveja.descricao}</td>
          <td className="text-center"> {cerveja.dataCadastro}</td>
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
                <th scope="col" className="text-center">ID</th>
                <th scope="col" className="text-center">Nome</th>
                <th scope="col" className="text-center">Nome do Fornecedor</th>
                <th scope="col" className="text-center">Valor de Venda</th>
                <th scope="col" className="text-center">Margem de Lucro</th>
                <th scope="col" className="text-center">Status</th>
                <th scope="col" className="text-center">Descrição</th>
                <th scope="col" className="text-center">Data Cadastro</th>
                <th scope="col" className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody id="tbody">
                {listaCervejas}
            </tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ListaCerveja;
