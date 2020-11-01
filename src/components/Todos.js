import React, { Component } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

class Todos extends Component {
  render() {
    // loop over the todos
    return this.props.todos.map((todos) => (
      <TodoItem
        key={todos.id}
        todo={todos}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
      />
    ))
  }
}

// Validation of PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
}

export default Todos
