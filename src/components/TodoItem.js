import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  // Methods
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none',
    }
  }

  render() {
    // Destructuring
    const { id, title } = this.props.todo

    // return JSX
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id)}
            style={{ marginRight: '10px' }}
          />
          {title}
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
            X
          </button>
        </p>
      </div>
    )
  }
}

// [Classname].PropTypes
TodoItem.propTypes = {
  // [Name of the prop]: PropTypes.[Type of Prop].isRequired
  todo: PropTypes.object.isRequired,
}

// Vars / Styles
const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '4px 7px',
  borderRadius: '100%',
  cursor: 'pointer',
  float: 'right',
}

export default TodoItem
