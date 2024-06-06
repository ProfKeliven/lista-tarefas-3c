import './App.css'
import React, {useCallback, useEffect, useReducer, useState} from 'react'

//definindo as ações adicionar, marcar como feito e deletar das tarefas
const taskReducer = (state, action) =>{
  switch(action.type){
    case 'ADD_TAREFA':
      return[...state, action.payload]
      //payload é o novo valor da tarefa que esta sendo adicionada
    case 'CONCLUIDO':
      const atualizarTarefa = [...state]
      atualizarTarefa[action.payload].completed = true
      return atualizarTarefa
  }
}

function App() {
  const [tarefa, setTarefa] = useState('')

  const [tarefaAtual, dispatch] = useReducer(taskReducer, [])
  //dispatch - funcao utilizada para despachar as ações para o useReducer executar 

  useEffect(() => {
    const armazenarTarefa = JSON.parse(localStorage.getItem('tarefaAtual'))
  }, [])
  //armazenando nossa tarefa em objeto json no localstorage (cache do navegador)

  useEffect(() =>{
    localStorage.setItem('tarefaAtual', JSON.stringify(tarefaAtual))
  })
  //buscando nossa tarefa que ta armazenada na memoria local e transformando em string

  //funcao adicionar tarefa

  const addTarefa = useCallback(() =>{
  //usando o useCallback para que as tarefas permaneçam as mesmas entre as renderizacões
  //verificar se a tarefa nao  ta vazia para que ela seja adicionada
    if(tarefa.trim() !== ''){
      dispatch({type: 'ADD_TAREFA', payload: {text: tarefa, completed: false}})
      setTarefa('');
    }
  }, [tarefa])



    return (
    <>
      <div className="center">
        <h1>Lista de Tarefas</h1>
        <div className="input">
          <input type="text" 
            placeholder='Nova tarefa'
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button onClick={addTarefa}>Adicionar</button>
        </div>
        <ul>
          {/*criando nossa lista de tarefas
            vamos usar o .map para maperar cada tarefa da lista, seguindo um index de posicao de cada tarefa
          */}
  
          {tarefaAtual.map((tarefas, index) => (
          // lista de tarefas de acordo com a posicao 
            <li kay={index}>
              {tarefas.text}</li>
          ))}


        </ul>
      </div>
    </>
  )
}

export default App
