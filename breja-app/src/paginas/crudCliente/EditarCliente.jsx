import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import { Button, Container, FormGroup } from "reactstrap";
import ListaCartao from "./ListaCartao";
import ListaEndereco from "./ListaEndereco";

class EditarCliente extends Component {
  emptyCliente = {
    nomeCompleto: "",
    cpf: "",
    classificacao: "",
    email: "",
    senha: "",
    telefone: "",
    dataNascimento: "",
    genero: "",
    status: "",
    enderecos: [
      {
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
    ],

    cartoes: [
      {
        numeroCartao: "",
        tipoConta: "",
        codigoSeguranca: "",
        bandeira: "",
        descricao: "",
      },
    ],
  };

  constructor(props) {
    super(props);

    console.log(`iniciar construtor do Cliente`);

    this.state = {
      cliente: this.emptyCliente,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //componentWillMount = chamado antes de iniiciar a renderização 
  //componentDidMount = chamado depois de renderizado. 

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const cliente = await (
        await fetch(`/api/cliente/${this.props.match.params.id}`)
      ).json();

      console.log(`será renderizado novamente mudando o State do Cliente`);

      this.setState({ cliente: cliente });
    }
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let cliente = { ...this.state.cliente};
    cliente[name] = value;
    this.setState({ cliente });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { cliente } = this.state;

    console.log(`será feito um requet : /api/cliente ${cliente.id} ? /  ${cliente.id} `);

    await fetch("/api/cliente" + (cliente.id ? "/" + cliente.id : ""), {
      method: cliente.id ? 'PUT' : 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    console.log(`apos o reques será retornado para pagina : /listaCliente`);

    this.props.history.push("/listaCliente");
  }

  createEndereco(){

    console.log("Criar novo endereco");

    const novoEndereco = {
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
    };

    const oldCliente = {...this.state.cliente}
    oldCliente.enderecos.push(novoEndereco)

    console.log(`Adicionado um novo endereço`);

    this.setState({ cliente : oldCliente})
  }

  editarEndereco(index, name, value){
    const oldCliente = {...this.state.cliente}
    oldCliente.enderecos[index][name] = value

    console.log(`Etidado um endereço no Cliente`);

    this.setState({ cliente : oldCliente })
  }

  deleteEndereco(index){
    const oldCliente = {...this.state.cliente}
    oldCliente.enderecos.splice(index,1);

    console.log(`Deletado um endereço`);

    this.setState({ cliente : oldCliente })
  }

  createCartao(){

    console.log("Criar novo Cartão");

    const novoCartao =  {
      numeroCartao: "",
      tipoConta: "",
      codigoSeguranca: "",
      bandeira: "",
      descricao: "",
    };

    const oldCliente = {...this.state.cliente}
    oldCliente.cartoes.push(novoCartao)

    console.log(`Adicionado um novo Cartao`);

    this.setState({ cliente : oldCliente})
  }

  editarCartao(index, name, value){
    const oldCliente = {...this.state.cliente}
    oldCliente.cartoes[index][name] = value

    console.log(`Editado um Cartao no Cliente`);

    this.setState({ cliente : oldCliente })
  }

  deleteCartao(index){
    const oldCliente = {...this.state.cliente}
    oldCliente.cartoes.splice(index,1);

    console.log(`Deletado um Cartão`);

    this.setState({ cliente : oldCliente })
  }

  render(){
    const {cliente} = this.state;
    const title = <h2>{cliente.id ? 'Editar Cliente' : 'Novo Cliente'}</h2>;

      return(
          <Container className="bg-light">
            {title}
            <form onSubmit={this.handleSubmit}>
                
                <fieldset >
                  <Container>
                    <label htmlFor="dadosPessoais"/><h3>Dados Pessoais</h3>				
                      <div className="input-group mb-3">
                        <span className="input-group-text">Nome Completo</span>
                        <input type="text" aria-label="Nome Completo" className="form-control" name="nomeCompleto" value={cliente.nomeCompleto || ''} onChange={this.handleChange} />
                      </div>

                      <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Email" aria-label="email" name="email" value={cliente.email || ''} onChange={this.handleChange} />
                      </div>

                      <div className="row">
                        <div className="input-group mb-3 col">
                          <input type="text" className="form-control" placeholder="Senha" aria-label="Senha" aria-describedby="basic-addon1" name="senha" value={cliente.senha || ''} onChange={this.handleChange} />
                        </div>

                        <div className="input-group mb-3 col">
                          <input type="text" className="form-control" placeholder="Repetir Senha" aria-label="RepetirSenha" aria-describedby="basic-addon1" name="senha" value={cliente.senha || ''} onChange={this.handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-group mb-3 col">
                          <input type="tel" className="form-control" placeholder="Telefone (XX) XXXXX-..." aria-label="Telefone" aria-describedby="basic-addon1" name="telefone" value={cliente.telefone || ''} onChange={this.handleChange} />
                        </div>

                        <div className="mb-3 col">
                          <input type="text" className="form-control" placeholder="Data Nascimento" aria-label="DataNascimento" name="dataNascimento" value={cliente.dataNascimento || ''} onChange={this.handleChange} />
                        </div>

                        <div className="mb-3 col">
                          <input type="number" className="form-control" placeholder="CPF" aria-label="CPF" name="cpf" value={cliente.cpf || ''} onChange={this.handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <select className="form-select mb-3" aria-label="Default select example">
                            <option name="genero" onChange={this.handleChange}>{cliente.genero || 'Genero'}</option>
                            <option value="1">Masculino</option>
                            <option value="2">Feminino</option>
                            <option value="3">Outros</option>
                          </select>
                        </div>
                      
                        <div className="col">
                          <select className="form-select mb-3" aria-label="Default select example">
                            <option name="status" onChange={this.handleChange}>{cliente.status || 'Status'}</option>
                            <option value="1">Ativo</option>
                            <option value="2">Inativado</option>
                            <option value="3">Outros</option>
                          </select>
                        </div>
                      </div>
                    </Container>
                </fieldset>

                <ListaEndereco 
                enderecos={this.state.cliente.enderecos} 
                createEndereco={this.createEndereco.bind(this)}
                editarEndereco={this.editarEndereco.bind(this)}
                deleteEndereco={this.deleteEndereco.bind(this)}/>


                <ListaCartao 
                cartoes={this.state.cliente.cartoes}
                createCartao={this.createCartao.bind(this)}
                editarCartao={this.editarCartao.bind(this)}
                deleteCartao={this.deleteCartao.bind(this)}/>

                <FormGroup>
                  <Button color="primary" type="submit">Salvar</Button>{' '}
                  <Button color="secondary" tag={Link} to="/listaCliente">Cancelar</Button>{' '}
                </FormGroup>
            </form>
        </Container>
      )
  }
}

export default withRouter(EditarCliente);
