import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import { Button, Container, FormGroup } from "reactstrap";
import ListaCategoria from "./ListaCategoria";

class EditarCerveja extends Component {

  emptyCerveja = {
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

  constructor(props) {
    super(props);

    console.log(`iniciar construtor da Cerveja`);

    this.state = {
      cerveja: this.emptyCerveja,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //componentWillMount = chamado antes de iniiciar a renderização 
  //componentDidMount = chamado depois de renderizado. 

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const cerveja = await (
        await fetch(`/api/cerveja/${this.props.match.params.id}`)
      ).json();

      console.log(`será renderizado novamente mudando o State do cerveja`);

      this.setState({ cerveja: cerveja });
    }
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let cerveja = { ...this.state.cerveja};
    cerveja[name] = value;
    this.setState({ cerveja });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { cerveja } = this.state;

    console.log(`será feito um requet : /api/cerveja ${cerveja.id} ? /  ${cerveja.id} `);

    await fetch("/api/cerveja" + (cerveja.id ? "/" + cerveja.id : ""), {
      method: cerveja.id ? 'PUT' : 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cerveja),
    });

    console.log(`apos o reques será retornado para pagina : /listacerveja`);

    this.props.history.push("/listacerveja");
  }

  createCategoria(){

    console.log("Criar novo Categoria");

    const novoCategoria = {
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

    const oldCerveja = {...this.state.cerveja}
    oldCerveja.categorias.push(novoCategoria)

    console.log(`Adicionado uma novo categorias`);

    this.setState({ cerveja : oldCerveja})
  }

  editarCategoria(index, name, value){
    const oldCerveja = {...this.state.cerveja}
    oldCerveja.categorias[index][name] = value

    console.log(`Editado uma Categoria da Cerveja`);

    this.setState({ Cerveja : oldCerveja })
  }

  deleteCategoria(index){
    const oldCerveja = {...this.state.cerveja}
    oldCerveja.categorias.splice(index,1);

    console.log(`Deletado uma Categoria`);

    this.setState({ cerveja : oldCerveja })
  }

  render(){
    const {cerveja} = this.state;
    const title = <h2>{cerveja.id ? 'Editar Cerveja' : 'Nova Cerveja'}</h2>;

      return(
          <Container className="bg-light">
            {title}
            <form onSubmit={this.handleSubmit}>
                
                <fieldset >
                  <Container>
                    <label htmlFor="dadosPessoais"/><h3>Dados Casdastrias</h3>				
                      <div className="input-group mb-3">
                        <span className="input-group-text">Nome Produto</span>
                        <input type="text" aria-label="Nome" className="form-control" name="nome" value={cerveja.nome || ''} onChange={this.handleChange} />
                      </div>


                      <div className="row">
                        <div className="input-group mb-3 col">
                          <input type="number" className="form-control" placeholder="valor De Venda" aria-label="valorDeVenda" name="valorDeVenda" value={cerveja.valorDeVenda || ''} onChange={this.handleChange} />
                        </div>

                        <div className="input-group mb-3 col">
                          <input type="number" className="form-control" placeholder="margem De Lucro" aria-label="margemDeLucro" aria-describedby="basic-addon1" name="margemDeLucro" value={cerveja.margemDeLucro || ''} onChange={this.handleChange} />
                        </div>

                        <div className="input-group mb-3 col">
                          <input type="number" className="form-control" placeholder="quantidade" aria-label="quantidade" aria-describedby="basic-addon1" name="quantidade" value={cerveja.quantidade || ''} onChange={this.handleChange} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-group mb-3 col">
                          <input type="text" className="form-control" placeholder="status" aria-label="status" aria-describedby="basic-addon1" name="status" value={cerveja.status || ''} onChange={this.handleChange} />
                        </div>

                        <div className="input-group mb-3 col">
                          <input type="text" className="form-control" placeholder="Nome do Fornecedor" aria-label="nomeFornecedor" aria-describedby="basic-addon1" name="nomeFornecedor" value={cerveja.nomeFornecedor || ''} onChange={this.handleChange} />
                        </div>

                        <div className="mb-3 col">
                          <input type="text" className="form-control" placeholder="Data de Cadastro" aria-label="dataCadastro" name="dataCadastro" value={cerveja.dataCadastro || ''} onChange={this.handleChange} />
                        </div>

                        <div className="mb-3 col">
                          <input type="text" className="form-control" placeholder="Descricao" aria-label="descricao" name="descricao" value={cerveja.descricao || ''} onChange={this.handleChange} />
                        </div>
                      </div>
                    </Container>
                </fieldset>

                <ListaCategoria
                categorias={this.state.cerveja.categorias} 
                createCategoria={this.createCategoria.bind(this)}
                editarCategoria={this.editarCategoria.bind(this)}
                deleteCategoria={this.deleteCategoria.bind(this)}/>


                <FormGroup>
                  <Button color="primary" type="submit">Salvar</Button>{' '}
                  <Button color="secondary" tag={Link} to="/listaCerveja">Cancelar</Button>{' '}
                </FormGroup>
            </form>
        </Container>
      )
  }
}

export default withRouter(EditarCerveja);
