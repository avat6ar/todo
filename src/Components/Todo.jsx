import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    todos.length > 0 && (
      <div className="todos">
        {todos.map((todo, index) => (
          <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
          >
            <span className="todo-number">{index + 1}</span>
            <span className="todo-text" onClick={() => completeTodo(todo.id)}>
              {todo.text}
            </span>
            <div className="icons">
              <RiCloseCircleLine
                onClick={() => removeTodo(todo.id)}
                className="delete-icon"
              />
              <TiEdit
                onClick={() =>
                  todo.isComplete
                    ? ""
                    : setEdit({ id: todo.id, value: todo.text })
                }
                className="edit-icon"
              />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Todo;
