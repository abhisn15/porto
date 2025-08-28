import React from 'react';

const AboutMe = () => {
  return (
    <div className="text-center mt-6">
      <h3 className="text-xl font-semibold text-teal-600">About Me</h3>
      <div className="mt-2 flex justify-center space-x-2">
        <span role="img" aria-label="laugh" className="text-yellow-400 text-2xl">😂</span>
        <span role="img" aria-label="cool" className="text-yellow-400 text-2xl">😎</span>
      </div>
    </div>
  );
};

export default AboutMe;