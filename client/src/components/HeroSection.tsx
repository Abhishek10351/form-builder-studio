import React from 'react';

const HeroSection: React.FC = () => (
  <main className="text-center py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
        Build Forms,{" "}
        <span className="gradient-text-hero">
          Collect Data,
        </span>{" "}
        Effortlessly.
      </h1>
      <p className="mt-4 text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto">
        Create beautiful and functional forms in minutes. No coding required.
      </p>
      <div className="mt-8">
        <a
          href="#"
          className="gradient-button-hero inline-block text-white font-semibold text-lg py-3 px-8 rounded-full"
        >
          Start Building for Free
        </a>
      </div>
    </div>
  </main>
);

export default HeroSection;