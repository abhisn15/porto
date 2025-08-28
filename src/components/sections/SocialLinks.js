import React from 'react';

const SocialLinks = () => {
  return (
    <div className="flex flex-col items-start space-y-2 text-gray-600">
      <a href="#" className="flex items-center space-x-2 hover:text-pink-500">
        <span className="text-pink-500">📸</span> Instagram
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-blue-500">
        <span className="text-blue-500">💼</span> LinkedIn
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-purple-500">
        <span className="text-purple-500">🧵</span> Threads
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-gray-800">
        <span className="text-gray-800">🐙</span> Github
      </a>
    </div>
  );
};

export default SocialLinks;