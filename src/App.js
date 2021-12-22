import React, { Component } from "react";

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super();
    this.handleText = this.handleText.bind(this);
    this.handleTask = this.handleTask.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false },
      ],
      newTask: "",
      error: false,
    };
  }

  handleTask(event) {
    event.preventDefault();
    if (this.state.newTask !== "") {
      let oldTasks = this.state.tasks;
      let newTask = {
        id: this.state.tasks.length + 1,
        name: this.state.newTask,
        done: false,
      };
      this.setState({
        tasks: [...oldTasks, newTask],
      });
      this.setState({
        newTask: "",
      });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  handleText(event) {
    this.setState({
      newTask: event.target.value,
      error: false,
    });
  }

  handleComplete(event) {
    const pos = event.target.value;
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.id === pos) {
          task.done = !task.done;
          console.log(task.done);
        }
        return task;
      }),
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => (
              <li
                key={task.id}
                value={task.id}
                onClick={this.handleComplete}
                className={task.done ? "done" : null}
              >
                {task.name}
              </li>
            ))}
          </ul>
          <form onSubmit={this.handleTask}>
            <input
              type="text"
              id="new-task"
              placeholder="Ingresa una tarea y oprime Enter"
              onChange={this.handleText}
              value={this.state.newTask}
              className={this.state.error ? "error" : null}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
