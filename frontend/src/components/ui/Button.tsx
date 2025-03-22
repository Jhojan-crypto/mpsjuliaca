import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button' }) => (
  <button type={type} className="btn" onClick={onClick}>
    {label}
  </button>
);

export default Button;
