import React,{Component} from 'react';
import axios from 'axios';

export default class TarefaForm extends Component{
  constructor(){
    super()

    this.state={
      "descricao":"",
      "realizada":false,
      "criadaQuando":Date.now(),
      "quem":"",
      "onde":"",
      "prioridade":0,
      "lista":[]
    }
    this.buscaTarefas()
  }

  setDescricao(e){
    this.setState({
      descricao: e.target.value
    })
  }
  setQuem(e){
    this.setState({
      quem: e.target.value
    })
  }
  setOnde(e){
    this.setState({
      onde: e.target.value
    })
  }
  setPrioridade(e){
    this.setState({
      prioridade: e.target.value
    })
  }

  buscaTarefas(){
    axios.get(`http://localhost:3003/api/tarefas`).
    then(
      res =>{
        this.setState({lista:res.data})
      }
    )
  }

  criaLinhasTable(){
    return(
      this.state.lista.map(tarefa =>(
        <tr>
          <td>{tarefa.descricao}</td>
          <td>{tarefa.criadaQuando}</td>
          <td>{tarefa.quem}</td>
          <td>{tarefa.onde}</td>
          <td>{tarefa.prioridade}</td>
          <td>
              <button className="btn btn-danger">Remover</button>
              <button className="btn btn-warning">Atualizar</button></td>
        </tr>
      ))
    )
  }

  cadastrar(){
    const newTask = {
      descricao:this.state.descricao,
      realizada: this.state.realizada,
      criadaQuando: this.state.criadaEm,
      onde:this.state.onde,
      quem:this.state.quem,
      prioridade:this.state.prioridade,
    }
    axios.post(
      `http://localhost:3003/api/tarefas`, newTask
    ).then(res => console.log(`${res.data}`))
    document.location.reload()
  }

  render(){
    return(
      <div className="form">
        <div className="form-group">
          <label 
            className="form-control" 
            htmlFor="descricao">Descrição</label>
          <input 
            type="text" 
            id="descricao" 
            onChange={e =>this.setDescricao(e)}
            value={this.state.descricao}/>
        </div>
        <div className="form-group">
          <label 
            className="form-control"
            htmlFor="onde">Onde</label>
          <input 
            type="text" 
            id="onde" 
            onChange={e =>this.setOnde(e)}
            value={this.state.onde}/>
        </div>
        <div className="form-group">
          <label 
            className="form-control"
            htmlFor="quem">Quem</label>
          <input 
            type="text" 
            id="quem" 
            onChange={e =>this.setQuem(e)}
            value={this.state.quem}/>
        </div>
        <div className="form-group">
          <label 
            className="form-control"
            htmlFor="prioridade">Prioridade</label>
          <input 
            type="number" 
            id="prioridade" 
            onChange={e =>this.setPrioridade(e)}
            value={this.state.prioridade}/>
        </div>
        <div className="">
          <button 
            className="btn btn-primary"
            type="button" 
            onClick={e =>this.cadastrar()}>Cadastra</button>
        </div>
        <div className="container">
          Lista de tarefas
          <table className="table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>CriadaQuando</th>
                <th>Quem</th>
                <th>Onde</th>
                <th>Prioridade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.criaLinhasTable()}
            </tbody>
          </table>
        </div>
      </div>
      
    )
  }
}