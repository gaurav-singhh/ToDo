import React, { useState } from "react";
import { useToDo } from "../context";

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useToDo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleteAction = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg px-4 py-2 gap-x-3 shadow-md transition-all duration-300 transform hover:scale-105 ${
        todo.completed ? "bg-green-200" : "bg-pink-200"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleteAction}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg transition-all duration-300 ${
          isTodoEditable
            ? "border-gray-300 px-2 py-1 bg-white"
            : "border-transparent"
        } ${todo.completed ? "line-through text-gray-700" : "text-gray-900"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
