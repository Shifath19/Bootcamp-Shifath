import React from 'react';

interface ButtonProps {
    type: 'button' | 'submit';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children }) => {
    return (
        <button
            type={type}
            className="bg-black text-white rounded-lg p-3 w-80 hover:bg-gray-800 transition duration-200"
        >
            {children}
        </button>
    );
};

export default Button; 