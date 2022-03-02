import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Container } from "reactstrap";

class EditarCliente extends Component {
  emptyItem = {
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
    this.state = {
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
      console.log(this.paramnsRequest);
    if (this.props.match.params.id !== "new") {
      const cliente = await (
        await fetch(`/api/cliente/${this.props.match.params.id}`)
      ).json();
      console.log(cliente);
      this.setState({ item: cliente });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/cliente" + (item.id ? "/" + item.id : ""), {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/clientes");
  }

  render(){
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Cliente' : 'Add Cliente'}</h2>;

      return(
          <Container>
            <form action="/api/cliente" method="post">
                
                <fieldset>
                  <label for="endereco"/><h3>Dados Pessoais</h3>				
                    <div class="input-group mb-3">
                      <span class="input-group-text">Nome Completo</span>
                      <input type="text" aria-label="Nome Completo" class="form-control" value={item.nomeCompleto || ''}/>
                    </div>

                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Email" aria-label="email" value={item.email || ''}/>
                    </div>

                    <div class="row">
                      <div class="input-group mb-3 col">
                        <input type="text" class="form-control" placeholder="Senha" aria-label="Senha" aria-describedby="basic-addon1" value={item.senha || ''}/>
                      </div>

                      <div class="input-group mb-3 col">
                        <input type="text" class="form-control" placeholder="Repetir Senha" aria-label="RepetirSenha" aria-describedby="basic-addon1" value={item.senha || ''}/>
                      </div>
                    </div>

                    <div class="row">
                      <div class="input-group mb-3 col">
                        <input type="tel" class="form-control" placeholder="Telefone (XX) XXXXX-..." aria-label="Telefone" aria-describedby="basic-addon1"/>
                      </div>

                      <div class="mb-3 col">
                        <input type="date" class="form-control" placeholder="Data Nascimento" aria-label="DataNascimento"/>
                      </div>

                      <div class="mb-3 col">
                        <input type="number" class="form-control" placeholder="CPF" aria-label="CPF"/>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <select class="form-select mb-3" aria-label="Default select example">
                          <option selected>Genero</option>
                          <option value="1">Masculino</option>
                          <option value="2">Feminino</option>
                          <option value="3">Outros</option>
                        </select>
                      </div>
                    
                      <div class="col">
                        <select class="form-select mb-3" aria-label="Default select example">
                          <option selected>Status</option>
                          <option value="1">Ativo</option>
                          <option value="2">Inativado</option>
                          <option value="3">Outros</option>
                        </select>
                      </div>
                    </div>
                </fieldset>

                <fieldset>
                    <label for="endereco"><h3>Endereço</h3></label>
                    <i id="addEndereco" class="material-icons">&#xE147;</i>
                    <i id="DeleteEndereco" class="material-icons">&#xE15C;</i>

                    <div id="enderecoPrincipal" class="row g-1">
                      <div class="row">
                        <div class="col-12 mb-3">
                          <input type="text" class="form-control" placeholder="Longratouro" aria-label="City"/>
                        </div>
                        <div class="col-3 mb-3">
                          <input type="text" class="form-control" placeholder="Tipo Longratouro" aria-label="State"/>
                        </div>
                        <div class="col-3 mb-3">
                          <input type="text" class="form-control" placeholder="Tipo de residência" aria-label="Zip"/>
                        </div>
                        <div class="col-3 mb-3">
                          <input type="number" class="form-control" placeholder="Número" aria-label="numero"/>
                        </div>
                        <div class="col-3 mb-3">
                          <input type="text" class="form-control" placeholder="Bairro" aria-label="State"/>
                        </div>

                        <div class="col-3 mb-3">
                          <input type="text" class="form-control" placeholder="Cidade" aria-label="cidade"/>
                        </div>
                        <div class="col-3 mb-3">
                          <input type="text" class="form-control" placeholder="Estado" aria-label="estado"/>
                        </div>
                        <div class="col-3 mb-3">
                          <input type="text" class="form-control" placeholder="CEP" aria-label="cep"/>
                        </div>

                        <div class="col-3 mb-3">
                          <input type="text" class="form-control" placeholder="Pais" aria-label="pais"/>
                        </div>

                        <div class="col-6 mb-3">
                          <input type="text" class="form-control" placeholder="ID Endereço" aria-label="idEndereco"/>
                        </div>

                        <div class="col-6 mb-3">
                          <input type="text" class="form-control" placeholder="Descrição" aria-label="descricao"/>
                        </div>
                     </div>

                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="enderecoCobranca" id="radioEnderecoCobrancaChecked" checked/>
                        <label class="form-check-label" for="radioEnderecoCobrancaChecked">Endereço de Cobrança</label>
                      </div>
                    </div>
                </fieldset>

                <fieldset>
                    <label for="cartao"><h3>Cartão</h3></label>
                    <i id="addcartao" class="material-icons">&#xE147;</i>
                    <i id="Deletecartao" class="material-icons">&#xE15C;</i>

                    <div id="cartaoPrincipal" class="row g-1">
                      <div class="row">
                        <div class="col-12 mb-3">
                          <input type="text" class="form-control" placeholder="Nº do Cartão" aria-label="City"/>
                        </div>
                        <div class="col mb-3">
                          <input type="text" class="form-control" placeholder="Tipo de residência" aria-label="Zip"/>
                        </div>
                        <div class="col mb-3">
                          <input type="number" class="form-control" placeholder="Código de Segurança" aria-label="numero"/>
                        </div>
                        <div class="col mb-3">
                          <select class="form-select" aria-label="Default select example">
                            <option selected>Bandeiras</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03...</option>
                          </select>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="cartaoPrincipal" id="radiocartaoPrincipalChecked" checked/>
                          <label class="form-check-label" for="radiocartaoPrincipalChecked">Cartão Principal</label>
                        </div>
                      </div>
                    </div>
                </fieldset>

            </form>
        </Container>
      )
  }
}

export default withRouter(EditarCliente);
