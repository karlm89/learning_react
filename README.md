# Learning React

These are notes from the Crash Course. This is just the basics : no state manager, or hooks.

[toc]

## Installing React

`> npx create-react-app [app-name]`

## Packages Used

UUID - Used for generating IDs

`> npm i uuid`

React Router - Router for React

`> npm i react-router-dom`

## File Expamples
### css
#### style.css

```css
.container {
  padding: 0 1rem;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
```

### src

#### App.js 

``` js
// src/App.js
import React, { Component } from 'react'
import uuid from 'uuid'
import Header from './components/layout/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'

class App extends Component {
// Define the app level state object
  state = {
// define todos as an array of objects
    todos : [
      {
        id: uuid.v4(),
        title : 'Take out the trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title : 'Dinner with Wife',
        completed: false
      },
      {
        id: uuid.v4(),
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
// Add todo to State
  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo ] })
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
      	<div class="container">
      		<AddTodo addTodo={ this.addTodo } />
					<Todos todos={ this.state.todos } markComplete = { this.markComplete } 
						delTodo = { this.delTodo } /> 
     		</div>
    	</div>
  	)
	}
}

// Export component
export default App
```
#### components

##### pages
###### About.js

Class Based Component with inline export function.

```js
import React from 'react'

export defaut function About() {
  return (
// React Fragment - Ghost Element, doesn't show in the DOM. JSX requires a single element in the return statement. This way keeps you from having to return a div element.
  	<React.Fragment>
    	<h1>About</h1>
    	<p>
    			This is the TodoList app v1.0.0. It is part of a React Crash Course by Brad Traversy.			 </p>
    </React.Fragment>
  )
}
```
#####  Todos Component

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

##### TodoItem Component

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
##### AddTodo Component 

Class Based Component

```js
import React, { Component } from 'react'

export class AddTodo extends Component {
  // Define component state
  state = {
    title: ''
  }

	onChange = (e) => this.setState({ [e.target.name]: e.target.value })
	onSubmit = (e) => {
    e.preventDefault()
    this.props.addTodo(this.state.title)
    this.setState({ title: '' })
  }

  render() {
    return (
			<form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
      	<input type="text" name="title" placeholder="Add Todo..." 
					value={this.state.title}
					onChange={this.onChange}
					style={{ flex:'10',padding: '5px' }} />
      	<input type="submit" value="Submit" className="btn" style={{ flex: '1' }} />
      </form>
    )
  }
}

export default AddTodo
```
##### Layouts
###### Header Component

Functional Component : This way uses the export at the bottom of the file, instead of inline.

```js
import React from 'react'

// Define the Header function
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