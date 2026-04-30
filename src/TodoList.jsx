import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prev) => [...prev, { task: newTodo.trim(), id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const markAsDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const markAllDone = () => {
    setTodos((prev) =>
      prev.map((todo) => ({ ...todo, isDone: true }))
    );
  };

  return (
    <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center p-4">
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-4">📝 Todo List</h2>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a new task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button className="btn btn-outline-primary" onClick={addNewTask}>
              ➕ Add
            </button>
          </div>

          <ul className="list-group">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  todo.isDone ? "list-group-item-success" : ""
                }`}
              >
                <span
                  style={{
                    textDecoration: todo.isDone ? "line-through" : "none",
                    fontWeight: "500",
                  }}
                >
                  {todo.task}
                </span>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete Task"
                  >
                    ❌
                  </button>
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => markAsDone(todo.id)}
                    title={todo.isDone ? "Undo" : "Mark as Done"}
                  >
                    {todo.isDone ? "↩️" : "✅"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button className="btn btn-success mt-4 w-100" onClick={markAllDone}>
            ✅ Mark All as Done
          </button>
        </div>
      </div>
    </div>
  );
}
