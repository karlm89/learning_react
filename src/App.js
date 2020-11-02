import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
// import { v4 as uuidv4 } from 'uuid'

import Header from './components/layouts/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import './App.css'

class App extends Component {
  // Define the app level state object
  state = {
    // You can define todos as an array of objects
    todos: [],
  }

  componentDidMount() {
    axios
      // Query jsonplaceholder with a limit of 10 todos for our array
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => this.setState({ todos: res.data }))
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
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }))
  }

  // Delete todo from State
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      )
  }

  // render the component
  render() {
    // return JSX
    return (
      <Router>
        <div className="App">
          <Header />
          <div class="container">
            {/* Match Route Exactly : without this, React will assume you want everything rendered in / all on other views */}
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

// Export component
export default App
