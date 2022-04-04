import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Button, Container, FormGroup } from "reactstrap";
import ListaCervejaPedido from "./ListaCervejaPedido";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

class EditarPedido extends Component {
  emptyPedido = {
    id : "",
    valorTotal: "",
    frete: "",
    status: "",
    
    cliente : {
      id : "",
      nomecompleto : "",
      cpf : "",
      email : ""
    },

    enderecoEnvio: {
      longadouro: "",
      tipoLongadouro: "",
      tipoResidencia: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      pais: "",
      descricao: "",
    },

    cartaoUtilizado: {
      numeroCartao: "",
      tipoConta: "",
      codigoSeguranca: "",
      bandeira: "",
      descricao: "",
    },

    cervejas: [
      {
        nome: "",
        valorDeVenda: "",
        margemDeLucro: "",
        status: "",
        nomeFornecedor: "",
        dataCadastro: "",
        descricao: "",
        categorias: [
          {
            nome: "",
            descricao: "",
          },
        ],
      },
    ],
  };

  constructor(props) {
    super(props);

    console.log(`iniciar construtor do Pedido`);

    this.state = {
      pedido: this.emptyPedido,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //componentWillMount = chamado antes de iniiciar a renderização
  //componentDidMount = chamado depois de renderizado.

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const pedido = await (
        await fetch(`/api/pedido/${this.props.match.params.id}`)
      ).json();

      console.log(`será renderizado novamente mudando o State do pedido`);
      console.log(pedido);

      this.setState({ pedido: pedido });
    }
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let pedido = { ...this.state.pedido };
    pedido[name] = value;
    pedido.enderecoEnvio[name] = value;
    pedido.cartaoUtilizado[name] = value;
    this.setState({ pedido });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { pedido } = this.state;

    console.log(
      `será feito um requet : /api/pedido ${pedido.id} ? /  ${pedido.id} `
    );

    await fetch("/api/pedido" + (pedido.id ? "/" + pedido.id : ""), {
      method: pedido.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    console.log(`apos o reques será retornado para pagina : /listaPedido`);

    this.props.history.push("/listapedido");
  }

  createCerveja() {
    console.log("Criar novo Cerveja");

    const novoCerveja = {
      nome: "",
      valorDeVenda: "",
      margemDeLucro: "",
      quantidade: "",
      status: "",
      nomeFornecedor: "",
      dataCadastro: "",
      descricao: "",
      categorias: [
        {
          nome: "",
          descricao: "",
        },
      ],
    };

    const oldpedido = { ...this.state.pedido };
    oldpedido.cervejas.push(novoCerveja);

    console.log(`Adicionado um novo Cerveja`);

    this.setState({ pedido: oldpedido });
  }

  editarCerveja(index, name, value) {
    const oldpedido = { ...this.state.pedido };
    oldpedido.cervejas[index][name] = value;

    console.log(`Editado uma Cerveja no pedido`);

    this.setState({ pedido: oldpedido });
  }

  deleteCerveja(index) {
    const oldpedido = { ...this.state.pedido };
    oldpedido.cervejas.splice(index, 1);

    console.log(`Deletado uma Cerveja`);

    this.setState({ pedido: oldpedido });
  }

  render() {
    const { pedido } = this.state;
    const title = <h2 className="text-center">{pedido.id ? "Editar pedido" : "Novo pedido"}</h2>;

    return (
      <div>
        <Header />
        <Container className="bg-light">
          {title}
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <Container>
                <label htmlFor="dadosPedido" />
                <h3>Dados do Pedido</h3>
                <div className="row">
                  <div className="input-group mb-3 col-12">
                    <span className="input-group-text">Nome Cliente</span>
                    <input
                      type="text"
                      aria-label="Nome Cliente"
                      className="form-control"
                      name="nomeCliente"
                      value={pedido.cliente.nomecompleto || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col-12">
                    <span className="input-group-text">Email Cliente</span>
                    <input
                      type="text"
                      aria-label="Email Cliente"
                      className="form-control"
                      name="emailCliente"
                      value={pedido.emailCliente || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">Status Pedido</span>
                    <input
                      type="text"
                      aria-label="status Pedido"
                      className="form-control"
                      name="status"
                      value={pedido.status || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">Data de Venda</span>
                    <input
                      type="text"
                      aria-label="Nome Cliente"
                      className="form-control"
                      name="dataCadastro"
                      value={pedido.dataCadastro || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">frete Pedido</span>
                    <input
                      type="text"
                      aria-label="frete Pedido"
                      className="form-control"
                      name="frete"
                      value={pedido.frete || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">Valor Total</span>
                    <input
                      type="text"
                      aria-label="Valor Total"
                      className="form-control"
                      name="valorTotal"
                      value={pedido.valorTotal || ""}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </Container>
            </fieldset>

            <fieldset>
              <Container>
                <label htmlFor="enderecoEnvio" />
                <h3>Endereço Envio</h3>
                <div className="row">
                  <div className="input-group mb-3 col-12">
                    <span className="input-group-text">longadouro</span>
                    <input
                      type="text"
                      aria-label="longadouro"
                      className="form-control"
                      name="longadouro"
                      value={pedido.enderecoEnvio.longadouro || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">tipoLongadouro</span>
                    <input
                      type="text"
                      aria-label="tipoLongadouro"
                      className="form-control"
                      name="tipoLongadouro"
                      value={pedido.enderecoEnvio.tipoLongadouro || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">tipoResidencia</span>
                    <input
                      type="text"
                      aria-label="tipoResidencia"
                      className="form-control"
                      name="tipoResidencia"
                      value={pedido.enderecoEnvio.tipoResidencia || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">numero</span>
                    <input
                      type="text"
                      aria-label="numero"
                      className="form-control"
                      name="numero"
                      value={pedido.enderecoEnvio.numero || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">bairro</span>
                    <input
                      type="text"
                      aria-label="bairro"
                      className="form-control"
                      name="bairro"
                      value={pedido.enderecoEnvio.bairro || ""}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-group mb-3 col">
                    <span className="input-group-text">cidade</span>
                    <input
                      type="text"
                      aria-label="cidade"
                      className="form-control"
                      name="cidade"
                      value={pedido.enderecoEnvio.cidade || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">estado</span>
                    <input
                      type="text"
                      aria-label="estado"
                      className="form-control"
                      name="estado"
                      value={pedido.enderecoEnvio.estado || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">cep</span>
                    <input
                      type="text"
                      aria-label="cep"
                      className="form-control"
                      name="cep"
                      value={pedido.enderecoEnvio.cep || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">pais</span>
                    <input
                      type="text"
                      aria-label="pais"
                      className="form-control"
                      name="pais"
                      value={pedido.enderecoEnvio.pais || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">descricao</span>
                    <input
                      type="text"
                      aria-label="descricao"
                      className="form-control"
                      name="descricao"
                      value={pedido.enderecoEnvio.descricao || ""}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </Container>
            </fieldset>

            <fieldset>
              <Container>
                <label htmlFor="cartaoUtilizado" />
                <h3>Cartão Utilizado</h3>
                <div className="row">
                  <div className="input-group mb-3 col-12">
                    <span className="input-group-text">numeroCartao</span>
                    <input
                      type="text"
                      aria-label="numeroCartao"
                      className="form-control"
                      name="numeroCartao"
                      value={pedido.cartaoUtilizado.numeroCartao || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">tipoConta</span>
                    <input
                      type="text"
                      aria-label="tipoConta"
                      className="form-control"
                      name="tipoConta"
                      value={pedido.cartaoUtilizado.tipoConta || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">codigoSeguranca</span>
                    <input
                      type="text"
                      aria-label="codigoSeguranca"
                      className="form-control"
                      name="codigoSeguranca"
                      value={pedido.cartaoUtilizado.codigoSeguranca || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">bandeira</span>
                    <input
                      type="text"
                      aria-label="bandeira"
                      className="form-control"
                      name="bandeira"
                      value={pedido.cartaoUtilizado.bandeira || ""}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="input-group mb-3 col">
                    <span className="input-group-text">descricao</span>
                    <input
                      type="text"
                      aria-label="descricao"
                      className="form-control"
                      name="descricao"
                      value={pedido.cartaoUtilizado.descricao || ""}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </Container>
            </fieldset>

            <ListaCervejaPedido
              cervejas={this.state.pedido.cervejas}
              createCerveja={this.createCerveja.bind(this)}
              editarCerveja={this.editarCerveja.bind(this)}
              deleteCerveja={this.deleteCerveja.bind(this)}
            />

            <FormGroup>
              <Button color="primary" type="submit">
                Salvar
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/listaPedido">
                Cancelar
              </Button>{" "}
            </FormGroup>
          </form>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(EditarPedido);
