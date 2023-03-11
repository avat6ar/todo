import React, { Fragment, useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  console.log(todos);
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [...todos.filter((item) => item.text !== todo.text), todo];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteAll = () => {
    setTodos([]);
  };
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [removeTodo, completeTodo, addTodo, updateTodo, deleteAll]);

  return (
    <Fragment>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} todos={todos} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      {todos.length > 1 && (
        <button className="todo-clear" onClick={() => deleteAll()}>
          Delete All Todo
        </button>
      )}
    </Fragment>
  );
};

export default TodoList;
