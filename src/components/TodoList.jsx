import React from 'react';
import TodoItem from './TodoItem';
import useTodoStore from '../store/todoStore';

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  
  const completedCount = todos.filter(todo => todo.completed).length;
  const hasCompleted = completedCount > 0;

  return (
    <div>
      <div className="divide-y divide-gray-200">
        {todos.length > 0 ? (
          todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="p-4 text-gray-500 text-center">No todos yet! Add one above.</div>
        )}
      </div>
      
      {todos.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 flex justify-between items-center text-sm">
          <span className="text-gray-600">
            {completedCount} of {todos.length} tasks completed
          </span>
          {hasCompleted && (
            <button 
              onClick={clearCompleted}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoList;
