import React, { Component} from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
        name:'',
        ingredients: '',
        quantity: '',
        uncountable: '',
        _id: '',
        tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
        name: this.state.name,
        ingredients: this.state.ingredients,
        quantity: this.state.quantity,
        uncountable: this.state.uncountable
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Task Updated'});
          this.setState({
            _id: '', 
            name: '', 
            ingredients: '', 
            quantity: '', 
            uncountable: ''
          });
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Task Saved'});
          this.setState({ 
            name: '', 
            ingredients: '', 
            quantity: '', 
            uncountable: ''
          });
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTask(id) {
    if(confirm('Are you sure you want to delete it?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Task deleted'});
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
        name: data.name,
        ingredients: data.ingredients,
        quantity: data.quantity,
        uncountable: data.uncountable,
        _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">La Belle Assiette Test</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s3">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Inventory Name" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="ingredients" onChange={this.handleChange} value={this.state.ingredients} cols="30" rows="10" placeholder="Ingredients" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="quantity" onChange={this.handleChange} value={this.state.quantity} cols="30" rows="10" placeholder="Enter Quantity" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="uncountable" onChange={this.handleChange} value={this.state.uncountable} cols="30" rows="10" placeholder="Uncountable Items" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Add Inventory
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s9">
              <table>
                <thead>
                  <tr>
                    <th>Inventory Name</th>
                    <th>Ingredients</th>
                    <th>Quantity</th>
                    <th>Uncountable Items</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.name}</td>
                          <td>{task.ingredients}</td>
                          <td>{task.quantity}</td>
                          <td>{task.uncountable}</td>
                          <td>
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;
