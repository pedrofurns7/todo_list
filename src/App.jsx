import { useState } from 'react'

import Todo from "./Components/Todo";
import TodoForm from './Components/TodoForm';
import Search from './Components/Search';
import Filter from './Components/Filter';

import "./App.css";




function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false
    },
    {
      id: 2,
      text: "Estudar useState para implementar no projeto",
      category: "Estudos",
      isCompleted: false
    },
    {
      id: 3,
      text: "Ir para o Jiu Jitsu",
      category: "Pessoal",
      isCompleted: false
    }

  ]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("Asc");

  const addTodo = (text, category) => {

    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false
    },
    ];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) => todo.id !== id ? todo : null);
    setTodos(filteredTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? todo.isCompleted = !todo.isCompleted : todo

    );
    console.log(newTodos);
    setTodos(newTodos);
  }
  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className="todo-list">
        {todos
          .filter((todo) => 
            filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
          .filter((todo) =>
            todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo 
              key={todo.id}     
              todo={todo}     
              removeTodo={removeTodo}
              completeTodo={completeTodo} 
            />
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>

  )
}
export default App
