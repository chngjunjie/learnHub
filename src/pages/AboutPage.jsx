import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">About This App</h1>
          <p className="mb-4">
            This is a simple Todo List application built using:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>React</li>
            <li>React Router 7</li>
            <li>TanStack Query</li>
            <li>Zustand for state management</li>
            <li>Tailwind CSS for styling</li>
          </ul>
          <p>
            It demonstrates a modern React application structure with the latest tools and libraries.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
