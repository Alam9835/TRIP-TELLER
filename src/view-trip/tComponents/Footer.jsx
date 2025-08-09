// Footer.jsx
import React from 'react';
import { Github } from 'lucide-react'; // GitHub icon from lucide-react

function Footer() {
  return (
    <div className="my-7">
      <h2 className="text-center text-gray-400 flex items-center justify-center gap-2">
        Created by
        <a
          href="https://github.com/Alam9835"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 underline text-blue-500 hover:text-blue-700"
        >
          <Github className="w-4 h-4" />
          @Alam9835
        </a>
      </h2>
    </div>
  );
}

export default Footer;
