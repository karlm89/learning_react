# Learning React

## Installing React

`> npx create-react-app [app-name]`

## File Expamples
### Main App.js 

``` js
// src/App.js
import React, { Component } from 'react'
import Header from './components/layout/Header'
import Todos from './components/Todos'

class App extends Component {
// Define the state object
  state = {
// define todos as an array of objects
    todos : [
      {
        id:1,
        title : 'Take out the trash',
        completed: false
      },
      {
        id:2,
        title : 'Dinner with Wife',
        completed: false
      },
      {
        id:3,
        title : 'Meeting with Boss',
        completed: false
      },
    ]
  }

// Toggles todo onChange
	markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo =>{
      if(todo.id === id) {
         todo.completed = !todo.completed
       }
      return todo
    }) })
  }
  
// Delete todo from State
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
  }
  
// render the component
	render() {
// return JSX
  	return (
  		<div className="App">
      	<Header />
				<Todos todos={ this.state.todos } markComplete = { this.markComplete } delTodo = { this.delTodo } />    
    	</div>
  	)
	}
}

// Export component
export default App
```

### Todos Component

Class Based Component

``` js
import React, { Component } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

class Todos extends Component {
  render() {
// loop over the todos
    return this.props.todos.map((todos) => (
			<TodoItem key={ todo.id } 
       		todo={ todo }
  				markComplete={ this.props.markComplete } 
					delTodo = { this.props.delTodo }
			/>
    ))
  }
}

// Validation of PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired
}

export default Todos
```

### TodoItem Component

Class Based Component

``` js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Todos extends Component {
// Methods
  getStyle = () => {
      return {
        background: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted',
        textDecoration: this.props.todo.completed ? 'line-through' : 'none'
      }
  }
  
  render() {
 // Destructuring
    const { id, title } = this.props.todo
    
 // return JSX
		return() {
      <div>
        <p>
        	<input type='checkbox' onChange={ this.props.markComplete.bind(this, id) }/>
        	{ title }
    			<button onClick={ this.props.delTodo.bind(this,id) } style={ btnStyle }>X</button>
      	</p>
      </div>
    }
  }
}

// [Classname].PropTypes
TodoItem.propTypes = {
// [Name of the prop]: PropTypes.[Type of Prop].isRequired
  todo: PropTypes.object.isRequired
}

// Vars / Styles
const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

export default TodoItem
```
### AddTodo Component 

Class Based Component

```js
import React, { Component } from 'react'

export class AddTodo extends Component {
  render() {
    return (
			<form style={{ display: flex }}>
      	<input type="text" name="title" placeholder="Add Todo...">
      	<input type="submit" value="Submit" className="btn" style={{flex: 1}}>
      </form>
    )
  }
}

export default AddTodo
```
### Header Component

// Fuctional Component

```js
import React from 'react'

function Header() {
   return (
	   <header style={headerStyle}>
     		<h1>TodoList</h1>
     </header>
   )
}

const headerStyle ={
  background: '$333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

export default Header
```