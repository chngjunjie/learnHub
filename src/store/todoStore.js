import { create } from 'zustand';

// Simple store definition
const useTodoStore = create((set) => ({
  todos: [
    { id: 1, text: 'Learn React Router', completed: true },
    { id: 2, text: 'Learn TanStack Query', completed: false },
    { id: 3, text: 'Learn Zustand', completed: false },
    { id: 4, text: 'Build a todo app', completed: false },
  ],
  
  // Add a new todo
  addTodo: (text) => 
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }]
    })),
  
  // Toggle todo completion status
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })),
  
  // Delete a todo
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    })),
    
  // Clear completed todos
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed)
    })),
}));

export default useTodoStore;
