import React from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Todo List</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <AddTodoForm />
          <TodoList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
