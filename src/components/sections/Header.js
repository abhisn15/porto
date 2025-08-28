import React from 'react';

const Header = () => {
  return (
    <header className="text-center p-6">
      <h1 className="text-3xl font-bold text-teal-600">Hi There 👋</h1>
      <h2 className="text-2xl font-semibold text-teal-500">I&apos;m Abhi Surya Nugroho</h2>
      <p className="text-lg text-gray-600">Fullstack Developer</p>
      <p className="text-md text-gray-500">Code with intention. Design with compassion.</p>
      <p className="text-sm text-gray-400">React JS | React Native | MySQL | SQL Server</p>
      <div className="mt-4 space-x-2">
        <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600">Download CV</button>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600">View My Projects</button>
      </div>
    </header>
  );
};

export default Header;