// src/App.js
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/layouts/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'

import './App.css'

class App extends Component {
  // Define the app level state object
  state = {
    // define todos as an array of objects
    todos: [
      {
        id: uuidv4(),
        title: 'Take out the trash',
        completed: false,
      },
      {
        id: uuidv4(),
        title: 'Dinner with Wife',
        completed: false,
      },
      {
        id: uuidv4(),
        title: 'Meeting with Boss',
        completed: false,
      },
    ],
  }

  // Toggles todo onChange
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      }),
    })
  }

  // Add todo to State
  addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    }
    this.setState({ todos: [...this.state.todos, newTodo] })
  }
  
  // Delete todo from State
  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    })
  }

  // render the component
  render() {
    // return JSX
    return (
      <div className="App">
        <Header />
        <div class="container">
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
        </div>
      </div>
    )
  }
}

// Export component
export default App
