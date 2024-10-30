// src/components/ui/text-style.js
import React from 'react';

const TextStyle = ({ children }) => {
  return <span style={{ fontWeight: 'bold', color: 'blue' }}>{children}</span>;
};

export default TextStyle;
